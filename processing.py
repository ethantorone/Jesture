import cv2
import numpy as np
import mediapipe as mp

def get_landmarks(image):
    """
    Finds x,y coordinates for each hand landmark in image

    Args:
        image [opencv image]: image to parse

    Returns: 
        array [np array] (21 x 2) of x, y coordinates corresponding to each landmark
        None if no landmarks are found
    """

    mp_hands = mp.solutions.hands

    hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
    image = cv2.flip(image, 1)

    # Convert the BGR image to RGB before processing.
    results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    array = []
    if results.multi_hand_landmarks:
        # Parse result json into numpy array
        for landmark in results.multi_hand_landmarks:
            for i in range(21):
                array.append([landmark.landmark[i].x, landmark.landmark[i].y, landmark.landmark[i].z])
        array = np.array(array)
        return array

    return None

def get_distances(array):
    """
    Flattens coordinates into x-y plane, finds distance from each point to wrist

    Args:
        array [np array] array of xyz coordinates

    Returns:
        array [np array] array of euclidean distances of each landmark to wrist
    """
    # Flatten array into x and y plane
    z_array = array[:,2]
    array = array[:,[0, 1]]
    z_array = np.tile(z_array, (2, 1)).transpose() + 1
    normal_array = np.divide(array, z_array)
    max = np.amax(normal_array)
    normal_array = normal_array / max
    wrist = np.tile(normal_array[0], (21, 1))
    distances = np.sum(np.square(np.subtract(normal_array, wrist)), axis=1)
    return distances

def distort(image):
    """
    Returns a list of distorted copies of the image

    Args:
        openCV image
    Returns:
        array of openCV images
    """
    
    # Fixed perspective points
    pts = np.float32([
            [[100,100],[1280,0],[0,720],[1280,720]],
            [[0,0],[1000,0],[0,720],[1280,720]],
            [[0,0],[1280,0],[0,600],[1280,720]],
            [[0,0],[1280,0],[0,720],[1000,600]],
            [[0,0],[1280,0],[0,720],[1280,720]],
        ])

    # Creates the transformation matrix and distorts image
    dst = [] 
    for i in range(5):
        M = cv2.getPerspectiveTransform(pts[i], pts[4])
        img = cv2.warpPerspective(image, M, (1280, 720))
        dst.append(img)
        dst.append(cv2.flip(img, 1))
        dst.append(cv2.resize(img, None, fx=2, fy=2, interpolation = cv2.INTER_LINEAR)[360:1080, 640:1920])
        base = np.zeros((720, 1280, 3), dtype=np.uint8)
        cv2.rectangle(base, (0,0), (1280, 720), (0,0,0),-1)
        base[180:540, 320:960] = cv2.resize(img, None, fx=0.5, fy=0.5, interpolation = cv2.INTER_AREA)
        dst.append(base)

    return dst

def mean_std(array):
    """
    Get mean and std for each landmark over several distance arrays

    Args:
        array [np array]: array of distances
    Returns:
        array [np array]: (21x2) [mean, std] for each landmark
    """
    mean = np.mean(array, axis = 0)
    std = np.std(array, axis = 0)

    return np.vstack([mean, std]).transpose()

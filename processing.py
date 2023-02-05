import base64
import cv2
import numpy as np
import mediapipe as mp

def read_image(data):
    """
    Reads base64 encoded image from frontend
    
    Args:
        data [str]: base64 encoded image
    
    Returns:
        image [open cv image]: opencv image
    """
    array = np.fromstring(base64.b64decode(data), np.uint8)
    image = cv2.imdecode(array, cv2.IMREAD_COLOR)
    return image


def get_landmarks(image, hands):
    """
    Finds x,y coordinates for each hand landmark in image

    Args:
        image [opencv image]: image to parse

    Returns: 
        array [np array] (21 x 2) of x, y coordinates corresponding to each landmark
        None if no landmarks are found
    """

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

    # flatten array to xy plane
    xy_projection = np.array([[1, 0, 0], [0, 1, 0], [0, 0, 0]])
    flat_array = array @ xy_projection

    # set origin to wrist
    wrist = np.tile(flat_array[0], (21, 1))
    centered = np.subtract(flat_array, wrist)

    # normalize
    max = np.amax(np.abs(centered))
    normal_array = centered / max

    # get square distances
    distances = np.sqrt(np.sum(np.square(normal_array), axis=1))

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

    dst.append(image)
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

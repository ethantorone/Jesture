import cv2
import numpy as np
import mediapipe as mp
import processing
import os
from time import sleep

mp_hands = mp.solutions.hands

hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
test = cv2.flip(cv2.imread("image.jpg"), 1)

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

images = []
for file in os.listdir("./images"):
    distorted = processing.distort(cv2.imread("./images/" + file))
    for image in distorted:
        landmarks = processing.get_landmarks(image)
        if landmarks is not None:
            images.append(processing.get_distances(landmarks))

images = np.array(images)
mean_std= processing.mean_std(images)

def process(image):
    image.flags.writeable = False
    results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    landmarks = processing.get_landmarks(image)
    if results.multi_hand_landmarks and landmarks is not None:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                image,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style())

        distances = processing.get_distances(landmarks)
        confidence = processing.get_confidence(distances, mean_std)
        if confidence > 0.6:
            print(":)")

    return image

# process(test)


vid = cv2.VideoCapture(0)

while vid.isOpened():
    ret, image = vid.read()
    if ret:
        image = process(image)
    cv2.imshow('', image)

    sleep(0.01)

    # PREVIEW
    if cv2.waitKey(1) & 0xFF==ord('q'):
        break

vid.release()
cv2.destroyAllWindows()

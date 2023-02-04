import cv2
import numpy as np
import mediapipe as mp

mp_hands = mp.solutions.hands

hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
image = cv2.flip(cv2.imread("image.jpg"), 1)


# Convert the BGR image to RGB before processing.
results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
array = []

for landmark in results.multi_hand_landmarks:
    for i in range(21):
        array.append([landmark.landmark[i].x, landmark.landmark[i].y, landmark.landmark[i].z])

array = np.array(array)



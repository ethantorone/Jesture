import cv2
import numpy as np
import mediapipe as mp
import processing

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

z_array = array[:,2]

array = array[:,[0, 1]]

z_array = np.tile(z_array, (2, 1)).transpose() + 1

normal_array = np.divide(array, z_array)

print(normal_array)

wrist = np.tile(normal_array[0], (21, 1))

distances = np.sum(np.square(np.subtract(normal_array, wrist)), axis=1)
print(distances)

dst = processing.distort(image)
for img in dst:
    cv2.imshow('', img)
    cv2.waitKey(0)


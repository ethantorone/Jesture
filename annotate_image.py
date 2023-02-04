import cv2
import numpy as np
import mediapipe as mp

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
image = cv2.flip(cv2.imread("image.jpg"), 1)


# Convert the BGR image to RGB before processing.
results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

for landmark in results.multi_hand_landmarks:
    mp_drawing.draw_landmarks(
          image,
          landmark,
          mp_hands.HAND_CONNECTIONS,
          mp_drawing_styles.get_default_hand_landmarks_style(),
          mp_drawing_styles.get_default_hand_connections_style())
    cv2.imwrite(
        'annotated_image.png', cv2.flip(image, 1))
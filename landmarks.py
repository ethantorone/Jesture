import cv2
import numpy as np
import mediapipe as mp
import processing
from collections import deque
from multiprocessing.pool import ThreadPool

mp_hands = mp.solutions.hands

hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
image = cv2.flip(cv2.imread("image.jpg"), 1)

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

def process(image):
    image.flags.writeable = False
    results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
 
    landmarks = processing.get_landmarks(image)
    if landmarks is not None:
        print(processing.get_distances(landmarks))

    if results.multi_hand_landmarks:
          for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                image,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style())
    return image


vid = cv2.VideoCapture(2)

thread_num = cv2.getNumberOfCPUs()
pool = ThreadPool(processes=thread_num)
pending = deque()

while vid.isOpened():

    # CONSUME
    while len(pending) > 0 and pending[0].ready():
        res = pending.popleft().get()
        cv2.imshow('', res)

    # POPULATE
    if len(pending) < thread_num:
        ret, image = vid.read()
        if ret:
            task = pool.apply_async(process, (image.copy(),))
            pending.append(task)

    # PREVIEW
    if cv2.waitKey(1) & 0xFF==ord('q'):
        break


    cv2.imshow('Hands', cv2.flip(image, 1))
    if cv2.waitKey(1) & 0xFF==ord('q'):
        break

vid.release()
cv2.destroyAllWindows()

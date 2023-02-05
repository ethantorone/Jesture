from flask import Flask, request, jsonify, render_template
from werkzeug.datastructures import ImmutableMultiDict
import mediapipe as mp
import numpy as np
import processing, gestures
import base64, cv2

app = Flask(__name__)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template('index.html')

@app.route("/cat", methods=["GET"])
def cat():
    landmarks = processing.get_landmarks(image, hands)
    if landmarks is not None:
        distances = processing.get_distances(landmarks)
        key, value = gestures.predict_gesture(distances)
        if key:
            return f"cat: {value}"
        else:
            return "no detection - CAT! :)"
    else:
        return "no landmarks - CAT! :)"

@app.route("/post", methods=["POST"])
def post_example():
    images = []
    distorted = processing.distort(image)
    for image in distorted:
        landmarks = processing.get_landmarks(image, hands)
        if landmarks is not None:
            images.append(processing.get_distances(landmarks))
    
    if images:
        images = np.array(images)
        mean_std = processing.mean_std(images)
        gestures.store_gesture(mean_std, key)

if __name__ == "__main__":
    app.run()

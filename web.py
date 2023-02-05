from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.datastructures import ImmutableMultiDict
import mediapipe as mp
import numpy as np
import processing, gestures
import base64, cv2

app = Flask(__name__)
CORS(app)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
key_count = 1

@app.route("/", methods=["GET", "POST"])
def index():
    data = request.get_json()
    print(data)
    return data

@app.route("/cat", methods=["GET"])
def cat():
    data = request.get_json()
    print(data)
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
    """
    Process post request from client to add gesture.

    Returns:
        response [JSON]: error is nonempty if adding gesture is unsuccessful
    """

    response = {'error': ''}

    # Parse request data
    data = request.get_json()
    image_string = data['imgSrc']
    
    # Add image to gestures
    image = processing.read_image(image_string[(image_string.index(',')+1):])
    images = []
    distorted = processing.distort(image)
    for image in distorted:
        landmarks = processing.get_landmarks(image, hands)
        if landmarks is not None:
            images.append(processing.get_distances(landmarks))
    
    if images:
        global key_count
        images = np.array(images)
        mean_std = processing.mean_std(images)
        gestures.store_gesture(mean_std, key_count)
        key_count += 1
        return response
    else:
        response['error'] = 'lol'

if __name__ == "__main__":
    app.run()

## Add gesture controls to any product :wave:
***
## Inspiration

> :eyes: a gesture for that would be sick

Today, we are surrounded by voice activated and controlled smart products. However, there can be limitations to voice commands such as noisy environments and unfamiliarity with the interactions required to properly activate voice commands. 

**Jesture** is a simple and effective alternative enabling individuals and organizations an alternative to voice command, providing an intutive interface to create gestures and map them to your desired actions.

## What it does
1. Take a picture of your gesture :camera:
2. Submit your picture to add a gesture model :brain:
3. Map your gesture to a command :globe_with_meridians:
4. Use your gesture :thumbsup:
5. *[Optional] profit* :moneybag:

## How we built it
### Backend
- Python Flask Server
    - listens for images from client
    - calls gesture creation and detection API
- Gesture Creation
    - uses mediapipe to detect hand landmarks from image
    - augments hand landmark data and process it into gesture
    - stores gesture
- Gesture Recognition
    - uses mediapipe to detect hand landmarks from image
    - use a distance heuristic to look for matches against existing gestures

### Frontend
- React.js
    - react-router, react-webcam, react-player
- Simulation Room
    - designed CSS art/animations for each biome
    - created commands to play desired music, change volume, and switch biome in response to gestures

## Things we're proud of
- The CSS art and animations are very pretty :star:
- Designed gesture creation and detection algorithms from scratch and they kinda work
- Rounded corners
- Did not get stuck trying to integrate flask server :)

## Challenges we ran into
- Almost got stuck trying to integrate flask server
- CSS Animations
- Processing hand landmark coordinates into gestures
- Detecting gestures
- Mentally

## What we learned
- OpenCV for image transformations
- How to design metrics for comparing data
- Convert everything into a NumPy Array
- We can make a GET with a POST but not a POST with a GET

## What's next
- Test integrating Jesture with smart home devices
- shower, sleep, wake up late, hit a nice brunch, go take a nap

import React, { useState } from "react";
import Webcam from "react-webcam";
import gestureCreateStyles from "./gestureCreate.modules.css";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [displayGestureSelect, setDisplayGestureSelect] = useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div className="cameraAndButtons">
      {imgSrc ? 
        <img className="capturedImg" src={imgSrc}></img>
      :
        <Webcam
          className="webCam"
          mirrored
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      }
      
      {imgSrc ? 
        <div className="buttons">
          <button className="captureButton" onClick={() => setImgSrc(null)}>TRY AGAIN</button>
          <button className="captureButton">SUBMIT GESTURE</button>
        </div>
      :
        <button className="captureButton" onClick={capture}>CAPTURE PHOTO</button>
      }
    </div>
  );
};

const ActionSelect = () => {
  return (
    <div>
      <h1>SELECT AN ACTION TO ASSOCIATE WITH YOUR GESTURE :</h1>
      <form className="actionsList">
        <label>
          <input type="radio" value="option1" checked={true} />
          PAUSE/PLAY MUSIC
        </label>
        <label>
          <input type="radio" value="option1" checked={true} />
          INCREASE VOLUME
        </label>
        <label>
          <input type="radio" value="option1" checked={true} />
          DECREASE VOLUME
        </label>
        <label>
          <input type="radio" value="option1" checked={true} />
          PLAY SONG
        </label>
        <label>
          <input type="radio" value="option1" checked={true} />
          OTHER
        </label>
      </form>
    </div>

  );
};

function GestureCreate(props) {
  return (
    <div className="gesture-page">
      <header className="gesture-header">
        <a className="exit-button" href='/'>Return to Room</a>
      </header>
      <WebcamCapture/>
      <ActionSelect/>
    </div>
  );
};

export default GestureCreate;

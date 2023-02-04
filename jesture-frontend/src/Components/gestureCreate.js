import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import gestureCreateStyles from "./gestureCreate.modules.css";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [displayActionSelect, setDisplayActionSelect] = useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const onSubmitImage = () => {
    setDisplayActionSelect(true);
  };

  useEffect(() => {
    const element = document.getElementById("pageBottom");
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }, [displayActionSelect]);

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
          <button className="captureButton" onClick={onSubmitImage}>SUBMIT GESTURE</button>
        </div>
      :
        <button className="captureButton" onClick={capture}>CAPTURE PHOTO</button>
      }

      {displayActionSelect ? 
        <ActionSelect/> 
        : 
        <></>
      }
      <div className="bottomOfPage" id="pageBottom"></div>
    </div>
  );
};

const ActionSelect = () => {
  return (
    <div className="actionSelection">
      <h1>SELECT AN ACTION TO ASSOCIATE WITH YOUR GESTURE :</h1>
      <form className="actionsList">
        <label>
          <input type="radio" value="pauseAndPlay" name="actions"/>
          <label>PAUSE/PLAY MUSIC</label>
        </label>
        <label>
          <input type="radio" value="incVol" name="actions" />
          <label>INCREASE VOLUME</label>
        </label>
        <label>
          <input type="radio" value="decVol" name="actions"/>
          <label>DECREASE VOLUME</label>
        </label>
        <label>
          <input type="radio" value="playSong" name="actions"/>
          <label>PLAY SONG:  <input type='text' className="songTitleBox"></input> </label>
        </label>
      </form>
    </div>
  );
};

function GestureCreate(props) {
  return (
    <div>
      <WebcamCapture/>
    </div>
  );
};

export default GestureCreate;

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import ActionSelect from "./actionSelect";
import gestureCreateStyles from "./gestureCreate.modules.css";
import $ from 'jquery';


function GestureCreate(props) {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [displayActionSelect, setDisplayActionSelect] = useState(false);
  console.log(props.gestureActions);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  function postImage(event) {
    $.ajax({
      type:"POST",
      url:"/test",

      context: document.body
    })
  };

  const onSubmitImage = () => {
    setDisplayActionSelect(true);
    returnFlaskPost();
  };

  useEffect(() => {
    const element = document.getElementById("pageBottom");
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }, [displayActionSelect]);

  const returnFlaskPost = () => {
    return fetch( 'http://localhost:5000/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      method: 'POST',
      body: {
        imgSrc
      }
    });
  };

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
      <div>
        <button className="captureButton" onClick={capture}>CAPTURE PHOTO</button>
      </div>

      }

      {displayActionSelect ? 
        <ActionSelect gestureActions={props.gestureActions}/> 
        : 
        <></>
      }
      <div className="bottomOfPage" id="pageBottom"></div>
    </div>
  );
};

export default GestureCreate;

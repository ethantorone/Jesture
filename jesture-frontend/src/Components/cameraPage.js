import React from "react";
import Webcam from "react-webcam";
import cameraPageStyles from "./cameraPage.modules.css";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam
        className="webCam"
        mirrored
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  );
};


function CameraPage(props) {
  return (
    <div>
      <WebcamCapture/>
    </div>
  );
};

export default CameraPage;

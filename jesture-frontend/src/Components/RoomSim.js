import roomSimStyles from './RoomSim.modules.css'
import ReactPlayer from 'react-player/youtube'
import { useState, useEffect } from 'react';
import Snowy from './Biomes/Snowy';
import Hills from './Biomes/Hills';
import Desert from './Biomes/Desert';
import Webcam from "react-webcam";
import React from "react";

const biomes = {
    "Snowy": <Snowy></Snowy>,
    "Hills": <Hills></Hills>,
    "Desert": <Desert></Desert>
}

function RoomSim(props) {
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [url, setUrl] = useState('https://youtu.be/Km71Rr9K-Bw')
    const [backgroundStlye, setBackgroundStyle] = useState("background-color:")
    const [biome, setBiome] = useState("Snowy")
    
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        console.log("capture happens");
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        returnFlaskPost(imageSrc);
    }, [webcamRef, setImgSrc]);

    const togglePlay = (e) => {
        setPlaying(!playing)
    }

    const increaseVolume = () => {
        setVolume(volume + 0.1 > 1 ? 1 : volume + 0.1)
    }

    const decreaseVolume = () => {
        setVolume(volume - 0.1 < 0 ? 0 : volume - 0.1)
    }

    const changeBackground = (color) => {

    }

    const returnFlaskPost = (imageSrc) => {
    return fetch( 'http://localhost:5000/', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
        method: 'POST',
        body: {
        imageSrc
        }
    });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            capture();
        }, 500);
      
        return () => clearInterval(interval);
      }, []);

    return (
        <div className="RoomSim">
            <Webcam
                className="webCam"
                mirrored
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <div className='Hidden'>
                <ReactPlayer 
                    url={url}
                    playing={playing}
                    volume={volume}
                    controls={true}
                ></ReactPlayer>
            </div>
            <div className='window'>
                {biomes[biome]}
            </div>
            <div className='button-container'>
                <button className="standard-button" onClick={togglePlay}>Play/Pause</button>
                <button className="standard-button" onClick={increaseVolume}>IncVol</button>
                <button className="standard-button" onClick={decreaseVolume}>DecVol</button>
                <a className="standard-anchor" href='/create-gesture'>Create Gesture</a>
            </div>
            
        </div>
    )
}

export default RoomSim;
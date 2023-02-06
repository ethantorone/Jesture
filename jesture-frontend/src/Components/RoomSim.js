import roomSimStyles from './RoomSim.modules.css'
import ReactPlayer from 'react-player/youtube'
import { useState, useEffect } from 'react';
import Snowy from './Biomes/Snowy';
import Hills from './Biomes/Hills';
import Desert from './Biomes/Desert';
import Webcam from "react-webcam";
import React from "react";
import { data } from 'jquery';
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    
    // console.log(props.gestureActions);
    const capture = React.useCallback(() => {
        console.log("capture happens");
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        returnFlaskPost(imageSrc);
        // getFlaskData();
    }, [webcamRef, setImgSrc]);


    const returnFlaskPost = (imageSrc) => {
    return fetch( 'http://localhost:5000/', {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
        method: 'POST',
        body: JSON.stringify({
            imageSrc
        })
    })
    .then(response => 
        response.json().then(data => ({
            data: data,
            detection: data.detection
        })).then(res => {
            console.log(res);
            doAction(res.detection);
            console.log(res.detection);
            // console.log(res.status, res.data.title);
            console.log(playing)
        }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            capture();
        }, 500);
      
        return () => clearInterval(interval);
    }, []);


    const doAction = (index) => {
        if (index <= 0) {
            console.log('No Gesture Detected')
            return
        }
        console.log(props.gestureActions)
        switch (props.gestureActions[index - 1]) {
            case 'incVal': 
                setVolume(volume + 0.1 > 1 ? 1 : volume + 0.1)
                break

            case 'decVal':
                setVolume(volume - 0.1 < 0 ? 0 : volume - 0.1)
                break

            case 'pauseAndPlay':
                console.log(!playing)
                setPlaying(prev => !prev)
                break
            case 'Snowy': 
                setBiome("Snowy")
                break
            case 'Hills':
                setBiome("Hills")
                break
            case 'Desert':
                setBiome('Desert')
                break
            default:
                setUrl(props.gestureActions[index - 1])
                break
        }
    }


    return (
        <div className="RoomSim">
            <Webcam
                className="simRoomWebCam"
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
                <button className="standard-anchor" onClick={() => navigate("/create-gesture")}>Create Gesture</button>
            </div>
            
        </div>
    )
}

export default RoomSim;
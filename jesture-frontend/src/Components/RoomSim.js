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
    .then(function(response) {
        console.log(response.json());
        doAction(response.json())
    });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            capture();
        }, 500);
      
        return () => clearInterval(interval);
    }, []);


    const doAction = (action) => {
        switch (action) {
            case 'incVal': 
                setVolume(volume + 0.1 > 1 ? 1 : volume + 0.1)
                break

            case 'decVal':
                setVolume(volume - 0.1 < 0 ? 0 : volume - 0.1)
                break

            case 'pauseAndPlay':
                setPlaying(!playing)
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
                setUrl(action)
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
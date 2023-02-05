import roomSimStyles from './RoomSim.modules.css'
import ReactPlayer from 'react-player/youtube'
import { useState } from 'react';
import Snowy from './Biomes/Snowy';
import Hills from './Biomes/Hills';
import Desert from './Biomes/Desert';

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
    const [biome, setBiome] = useState("Desert")

    const changeUrl = (newUrl) => {
        setUrl(newUrl)
    } 

    const togglePlay = (e) => {
        setPlaying(!playing)
    }

    const increaseVolume = () => {
        setVolume(volume + 0.1 > 1 ? 1 : volume + 0.1)
    }

    const decreaseVolume = () => {
        setVolume(volume - 0.1 < 0 ? 0 : volume - 0.1)
    }

    const changeBiome = (newBiome) => {
        setBiome(biome)
    }

    const makeSnowy = () => {
        setBiome("Snowy")
    }

    const makeDesert = () => {
        setBiome("Desert")
    }

    const makeHills = () => {
        setBiome("Hills")
    }

    return (
        <div className="RoomSim">
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
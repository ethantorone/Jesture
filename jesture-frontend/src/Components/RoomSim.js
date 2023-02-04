import roomSimStyles from './RoomSim.modules.css'
import ReactPlayer from 'react-player/youtube'
import { useState } from 'react';

function RoomSim(props) {
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [url, setUrl] = useState('https://youtu.be/Km71Rr9K-Bw')

    const togglePlay = (e) => {
        setPlaying(!playing)
    }

    const increaseVolume = () => {
        setVolume(volume + 0.1 > 1 ? 1 : volume + 0.1)
    }

    const decreaseVolume = () => {
        setVolume(volume - 0.1 < 0 ? 0 : volume - 0.1)
    }

    return (
        <div className="RoomSim">
            <div className="Room">
                <div className='Hidden'>
                    <ReactPlayer 
                        url={url}
                        playing={playing}
                        volume={volume}
                        controls={true}
                    ></ReactPlayer>
                </div>
                
            </div>
            <button onClick={togglePlay}>Play/Pause</button>
            <button onClick={increaseVolume}>IncVol</button>
            <button onClick={decreaseVolume}>DecVol</button>
        </div>
    )
}

export default RoomSim;
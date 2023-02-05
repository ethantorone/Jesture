import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ActionSelect = (props) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [url, setUrl] = ('')
  const navigate = useNavigate();

  function onValueChange(event){
    setSelectedAction(event.target.value);
  }

  function createGesture(event) {
    event.preventDefault();
    if (selectedAction === 'playSong') {
      props.gestureActions.push(url)
    } else {
      props.gestureActions.push(selectedAction);
    }
    console.log(props.gestureActions);
    navigate("/");
  }


  return (
    <div className="actionSelection">
      <h1>SELECT AN ACTION TO ASSOCIATE WITH YOUR GESTURE :</h1>
      <form className="actionsList">
        <label>
          <input type="radio" value="pauseAndPlay" onChange={onValueChange} name="actions"/>
          <label>PAUSE/PLAY MUSIC</label>
        </label>
        <label>
          <input type="radio" value="incVol" onChange={onValueChange} name="actions" />
          <label>INCREASE VOLUME</label>
        </label>
        <label>
          <input type="radio" value="decVol" onChange={onValueChange} name="actions"/>
          <label>DECREASE VOLUME</label>
        </label>
        <label>
          <input type="radio" value="Snowy" onChange={onValueChange} name="actions"/>
          <label>CHANGE BIOME: SNOWY</label>
        </label>
        <label>
          <input type="radio" value="Hills" onChange={onValueChange} name="actions"/>
          <label>CHANGE BIOME: HILLS</label>
        </label>
        <label>
          <input type="radio" value="Desert" onChange={onValueChange} name="actions"/>
          <label>CHANGE BIOME: DESERT</label>
        </label>
        <label>
          <input type="radio" value="playSong" onChange={onValueChange} name="actions"/>
          <label>PLAY SONG:  <input type='text' className="songTitleBox" value={url} onChange={(e) => {setUrl(e.target.value)}}></input> </label>
        </label>
        <button className="createGestureButton" onClick={createGesture}>CREATE GESTURE</button>
      </form>
    </div>
  );
};

export default ActionSelect
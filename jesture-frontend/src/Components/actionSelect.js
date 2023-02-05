import React, { useState } from "react";

const ActionSelect = (props) => {
  const [selectedAction, setSelectedAction] = useState("");

  function onValueChange(event){
    setSelectedAction(event.target.value);
  }

  function createGesture(event) {
    event.preventDefault();
    props.gestureActions.push(selectedAction);
    console.log(props.gestureActions);
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
          <input type="radio" value="playSong" onChange={onValueChange} name="actions"/>
          <label>PLAY SONG:  <input type='text' className="songTitleBox"></input> </label>
        </label>
        <button className="createGestureButton" onClick={createGesture}>CREATE GESTURE</button>
      </form>
    </div>
  );
};

export default ActionSelect
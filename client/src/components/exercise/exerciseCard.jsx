import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ExerciseCard = (props) => {
  function addToLog (name) {
    console.log(name)
  }

  return (
    <div>
      <section>
        <h4>{props.exercise.name}</h4>
        <p>{props.exercise.instructions}</p>
        <button onClick={() => addToLog(props.exercise.name)}>Add to Log</button>
      </section>
    </div>
  )
}

export default ExerciseCard;
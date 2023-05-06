import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import AddExercise from './addExercise.jsx';

const ExerciseMain = () => {
  const [exerciseLog, setExerciseLog] = UseState();

  useEffect(() => {

  }, []);

  function addExercise () {
    ReactDOM.render(<AddExercise />, document.getElementById('app'));
  }

  return (
    <div>
      <h1>Exercise Log</h1>
      <div>
        exercise log here
      </div>
      <button onClick={addExercise}>Add Exercise</button>
    </div>
  )
}

export default ExerciseMain;
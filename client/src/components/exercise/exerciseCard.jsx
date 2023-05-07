import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ExerciseCard = (props) => {
  const [time, setTime] = useState();

  function handleTimeInput (e) {
    setTime(e.target.value)
  }

  function addToLog (name) {
    console.log(name, time)
    axios.post('/logExercise', { params: { name: name, time: time }})
    .then(data => {
      console.log(data)
    })
  }

  return (
    <div>
      <section>
        <h4>{props.exercise.name}</h4>
        <p>{props.exercise.instructions}</p>
        <form>
          <input type='number' placeholder='Input Time in Minutes' onChange={handleTimeInput}/>
          <button onClick={() => addToLog(props.exercise.name)}>Add to Log</button>
        </form>
      </section>
    </div>
  )
}

export default ExerciseCard;
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import './exerciseCss.css';

const ExerciseCard = (props) => {
  const [time, setTime] = useState();
  const navigate = useNavigate();

  function handleTimeInput(e) {
    setTime(e.target.value);
  }
  //console.log('test', props);
  function addToLog(name, userId) {
    //console.log('name, userId', name, userId)
    axios.post('/logExercise', { params: { user_id: userId, name: name, time: time } })
      .then(data => {
        console.log(data);
        navigate('/exerciseMain')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <section>
        <h4>{props.exercise.name}</h4>
        <p>{props.exercise.instructions}</p>
        {/* <form> */}
        <input type='number' placeholder='Input Time in Minutes' onChange={handleTimeInput} />
        <button className='button' onClick={() => {addToLog(props.exercise.name, props.uid)}}>Add to Log</button>
        {/* </form> */}
      </section>
    </div>
  )
}

export default ExerciseCard;
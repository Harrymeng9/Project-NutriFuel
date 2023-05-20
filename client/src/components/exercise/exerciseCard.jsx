import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import './exerciseCss.css';

const ExerciseCard = (props) => {
  const [time, setTime] = useState();
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        light: "#4CB963",
        main: '#157F1F',
        dark: "#1D263B",
        contrastText: "#5C67B4"
      }
    },
  });

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
        <Typography variant='h6'>{props.exercise.name}</Typography>
        <p>{props.exercise.instructions}</p>
        <TextField type='number' placeholder='Input Time in Minutes' onChange={handleTimeInput} />
        <Button variant='outlined' onClick={() => {addToLog(props.exercise.name, props.uid)}}>Add to Log</Button>
    </div>
  )
}

export default ExerciseCard;

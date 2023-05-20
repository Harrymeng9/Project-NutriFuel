import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseCard from './exerciseCard.jsx';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Navigation from '../navigation/navigation.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AddExercise = ({userInfo, auth}) => {
  const [exerciseList, setExerciseList] = useState([]);
  const [uid, setUid] = useState();
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

  useEffect(() => {
    setUid(userInfo.current.uid);
  }, [])

  function fetchExercises(e) {
    var muscle = e.target.id;
    axios.get('/exercise', { params: { name: muscle } })
      .then(data => {
        // console.log('API', data.data);
        setExerciseList(data.data);
      })
      .catch(err => {
        console.log('fetchExercise err', err);
      })
  }

  return (
    <div>
      <Typography variant='h4'>Add Exercise</Typography>
      <Typography variant='h6'>Select muscle group</Typography>
      <div>
        <Button variant='outlined' onClick={fetchExercises} id='chest'>Chest</Button>
        <Button variant='outlined' onClick={fetchExercises} id='lats'>Back</Button>
        <Button variant='outlined' onClick={fetchExercises} id='shoulders'>Shoulders</Button>
        <Button variant='outlined' onClick={fetchExercises} id='quadriceps'>Quadriceps</Button>
        <Button variant='outlined' onClick={fetchExercises} id='hamstrings'>Hamstrings</Button>
        <Button variant='outlined' onClick={fetchExercises} id='glutes'>Glutes</Button>
        <Button variant='outlined' onClick={fetchExercises} id='biceps'>Biceps</Button>
        <Button variant='outlined' onClick={fetchExercises} id='triceps'>Triceps</Button><br></br>
      </div>
      <div>
        {exerciseList.map(entry => {
          // console.log('test', entry);
          return (
            <div className="exerciseCard" key={entry.name}>
              <ExerciseCard exercise={entry} uid={uid} />
            </div>
          );
        })}
      </div>
      <Navigation userInfo={userInfo} auth={auth} />
    </div>
  )
}

export default AddExercise;

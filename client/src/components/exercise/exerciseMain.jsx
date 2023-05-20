import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import AddExercise from './addExercise.jsx';
import axios from 'axios';
import ExerciseLogCard from './exerciseLogCard.jsx';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Navigation from '../navigation/navigation.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ExerciseMain = ({userInfo,auth}) => {
  const [exerciseLog, setExerciseLog] = useState([]);
  const [timeEx, setTimeEx] = useState(0);
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
    axios.get('/exerciseLog', { params: { user_id: userInfo.current.uid } })
      .then(data => {
        //console.log('useEffect data', data);
        setExerciseLog(data.data);
      })
      .catch(err => {
        console.log('exerciseLog useEffect err', err);
      })
  }, []);

  const navigate = useNavigate();

  function goToAddExercisePage() {
    navigate('/addExercise');
    // ReactDOM.render(<AddExercise />, document.getElementById('app'));
  };

  return (
    <div>
      <Typography variant='h4'>
        Exercise Log
      </Typography>
      <div>
        {exerciseLog.map(entry => {
          //console.log(entry)
          return (
            <div className="exerciseLogCard" key={entry.id}>
              <ExerciseLogCard exercise={entry} userInfo={userInfo}/>
            </div>
          );
        })}
      </div>
      <Button variant='outlined' onClick={goToAddExercisePage}>Add Exercise</Button>
      <Navigation userInfo={userInfo} auth={auth} />
    </div>
  )
}

export default ExerciseMain;

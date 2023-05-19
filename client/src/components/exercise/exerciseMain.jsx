import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import AddExercise from './addExercise.jsx';
import axios from 'axios';
import ExerciseLogCard from './exerciseLogCard.jsx';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Navigation from '../navigation/navigation.jsx';

const ExerciseMain = (userInfo) => {
  const [exerciseLog, setExerciseLog] = useState([]);
  const [timeEx, setTimeEx] = useState(0);

  useEffect(() => {
    axios.get('/exerciseLog', { params: { user_id: userInfo.userInfo.current.uid } })
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
      <h1>Exercise Log</h1>
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
      <button onClick={goToAddExercisePage}>Add Exercise</button>
      <Navigation />
    </div>
  )
}

export default ExerciseMain;
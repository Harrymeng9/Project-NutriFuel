import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseCard from './exerciseCard.jsx';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Navigation from '../navigation/navigation.jsx';

const AddExercise = (userInfo) => {
  const [exerciseList, setExerciseList] = useState([]);
  const [uid, setUid] = useState()

  useEffect(() => {
    setUid(userInfo.userInfo.current.uid);
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
      <h1>Add Exercise</h1>
      <h2>Select muscle group</h2>
      <div>
        <button onClick={fetchExercises} id='chest'>Chest</button>
        <button onClick={fetchExercises} id='lats'>Back</button>
        <button onClick={fetchExercises} id='shoulders'>Shoulders</button>
        <button onClick={fetchExercises} id='quadriceps'>Quadriceps</button>
        <button onClick={fetchExercises} id='hamstrings'>Hamstrings</button>
        <button onClick={fetchExercises} id='glutes'>Glutes</button>
        <button onClick={fetchExercises} id='biceps'>Biceps</button>
        <button onClick={fetchExercises} id='triceps'>Triceps</button><br></br>
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
      <Navigation />
    </div>
  )
}

export default AddExercise;
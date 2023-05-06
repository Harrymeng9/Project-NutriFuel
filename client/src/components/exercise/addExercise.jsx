import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseCard from './exerciseCard.jsx';

const AddExercise = () => {
  const [exerciseList, setExerciseList] = useState([]);

  function fetchExercises (e) {
    var muscle = e.target.id;
    axios.get('/exercise', { params: { name: muscle } })
      .then(data => {
        console.log(data.data);
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
        <button onClick={fetchExercises} id='chest'>Chest</button><br></br>
        <button onClick={fetchExercises} id='lats'>Back</button><br></br>
        <button onClick={fetchExercises} id='shoulders'>Shoulders</button><br></br>
        <button onClick={fetchExercises} id='quadriceps'>Quadriceps</button><br></br>
        <button onClick={fetchExercises} id='hamstrings'>Hamstrings</button><br></br>
        <button onClick={fetchExercises} id='glutes'>Glutes</button><br></br>
        <button onClick={fetchExercises} id='biceps'>Biceps</button><br></br>
        <button onClick={fetchExercises} id='triceps'>Triceps</button><br></br>
      </div>
      <div>
        {exerciseList.map(entry => {
          console.log(entry)
          return (
            <div className="exerciseCard" key={entry.name}>
              <ExerciseCard exercise={entry}/>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default AddExercise;
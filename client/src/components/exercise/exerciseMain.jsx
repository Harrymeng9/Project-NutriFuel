import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import AddExercise from './addExercise.jsx';
import axios from 'axios';
import ExerciseLogCard from './exerciseLogCard.jsx';

const ExerciseMain = () => {
  const [exerciseLog, setExerciseLog] = useState([]);

  useEffect(() => {
    axios.get('/exerciseLog', { params: { user_id: 1 } })
    .then(data => {
      console.log('useEffect data', data);
      setExerciseLog(data.data);
    })
    .catch(err => {
      console.log('exerciseLog useEffect err', err);
    })
  }, []);

  function addExercise () {
    ReactDOM.render(<AddExercise />, document.getElementById('app'));
  }

  return (
    <div>
      <h1>Exercise Log</h1>
      <div>
      {exerciseLog.map(entry => {
          console.log(entry)
          return (
            <div className="exerciseLogCard" key={entry.name}>
              <ExerciseLogCard exercise={entry}/>
            </div>
          );
        })}
      </div>
      <button onClick={addExercise}>Add Exercise</button>
    </div>
  )
}

export default ExerciseMain;
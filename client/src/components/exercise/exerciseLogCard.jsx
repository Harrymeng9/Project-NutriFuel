import React from 'react';
import './exerciseCss.css';

const ExerciseLogCard = (props) => {
  if (props.exercise.exercise_name !== undefined) {
    return (
      <div>
        Name - {props.exercise.exercise_name}<br></br>
        Time - {props.exercise.time} mins
        <div></div>
        <br></br>
      </div>
    )
  } else if (props.exercise.calories !== undefined) {
    return (
      <div>
        Calories Burned = {props.exercise.calories}
      </div>
    )
  }
};

export default ExerciseLogCard;
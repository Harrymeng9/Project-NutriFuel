import React from 'react';

const ExerciseLogCard = (props) => {
  if (props.exercise.name !== undefined) {
    return (
      <div>
        Name - {props.exercise.name}<br></br>
        Time - {props.exercise.time}
      </div>
    )
  } else {
    return (
      <div>
        Calories Burned = {props.exercise.calories}
      </div>
    )
  }
};

export default ExerciseLogCard;
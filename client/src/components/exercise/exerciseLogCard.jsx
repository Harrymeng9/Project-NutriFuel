import React from 'react';

const ExerciseLogCard = (props) => {
  return (
    <div>
      Name - {props.exercise.name}<br></br>
      Time - {props.exercise.time}
    </div>
  )
};

export default ExerciseLogCard;
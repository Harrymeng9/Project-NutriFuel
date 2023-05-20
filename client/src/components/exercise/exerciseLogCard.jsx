import React from 'react';
import './exerciseCss.css';

const ExerciseLogCard = (props) => {
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

  function deleteExercise () {
    axios.put('/deleteExercise', { params: {user_id: props.exercise.user_id, exercise_id: props.exercise.exercise_id}})
    .then(data => {
      console.log(data);
      navigate('/')
    })
    .catch(err => {
      if (err) {
        console.log('delete exercise err', err)
      }
    })
  }
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

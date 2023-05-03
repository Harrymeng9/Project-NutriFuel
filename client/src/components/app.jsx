import ReactDOM from 'react-dom';
import React from 'react';
import ExerciseMain from './exercise/exerciseMain.jsx';
import Nutrition from './nutrition/Nutrition.jsx';

const App = () => {

  return (
    <div>
      <h1>This is my React app!</h1>
      <ExerciseMain />
      <Nutrition />
    </div>
  )
}

export default App;
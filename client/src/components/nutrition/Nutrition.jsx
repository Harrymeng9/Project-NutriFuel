import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import AddNutrition from './AddNutrition.jsx';

const Nutrition = () => {

  return (
    <div>
      <h2>Nutrition Section</h2>
      <AddNutrition />
    </div>
  )
}

export default Nutrition;
import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';

const NutritionEntry = (props) => {

  function deleteFood() {
    axios.put('/NutritionList', { nutrition_id: props.nutrition_id })
      .then((data) => {
        console.log('Delete it successfully!');
      })
      .catch((err) => {
        console.log('Err', err);
      })
  };

  return (
    <div>
      <div>Date: {props.date}</div>
      <div>Food: {props.food_name}</div>
      <div>Qty: {props.qty}</div>
      <div>Total Calories:  {props.total_calories}</div>
      <div><button onClick={deleteFood}>Delete</button></div>
      <br></br>
    </div>
  )
}

export default NutritionEntry;
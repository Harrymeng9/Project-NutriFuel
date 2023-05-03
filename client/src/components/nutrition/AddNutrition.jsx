import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';

const AddNutrition = () => {

  const [foodSearchName, setFoodSearchName] = useState('');
  const [foodName, setFoodName] = useState('');
  const [servingSize, setServingSize] = useState(0);
  const [calories, setCalories] = useState(0);
  const [qty, setQty] = useState(1);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    axios.get('/Nutrition', { params: { foodSearchName: foodSearchName } })
      .then((data) => {
        console.log('test', data.data);
        setFoodName(data.data.name);
        setCalories(data.data.calories);
        setServingSize(data.data.serving_size_g);
      })
      .catch((err) => {
        console.log('err', err);
      })
  }, [foodSearchName]);

  return (
    <div>
      <input type="text" placeholder="Please enter the food" onChange={(e) => { setFoodSearchName(e.target.value) }} />
      <button type="submit">Search</button>
      <div>Food: {foodName}</div>
      <div>Serving Size (g): {servingSize}</div>
      <div>Calories: {calories}</div>
      <div>Qty: <input type="text" onChange={(e) => { setQty(e.target.value) }} /></div>
      <div>Total Calories: {calories * qty}</div>
      <button>Add Food</button>
    </div>
  )
}

export default AddNutrition;

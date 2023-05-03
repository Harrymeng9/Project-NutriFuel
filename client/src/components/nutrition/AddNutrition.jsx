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
    if (foodSearchName === '') {
    setFoodName('');
    setServingSize(0);
    setCalories(0);
    setQty(1);
  } else {
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
  }
}, [foodSearchName]);

function addFood() {
  // add data into the database
  // reset all numbers to default, once FoodSearchName is empty, it will trigger the above useEffect()
  setFoodSearchName('');
};

// Total calories should be recalculated once qty or food calories changed
useEffect(() => {
  setTotalCalories(qty * calories);
}, [qty, calories]);

return (
  <div>
    <input type="text" placeholder="Please enter the food" value={foodSearchName} onChange={(e) => { setFoodSearchName(e.target.value) }} />
    <div>Food: {foodName}</div>
    <div>Serving Size (g): {servingSize}</div>
    <div>Calories: {calories}</div>
    <div>Qty: <input type="text" value={qty} onChange={(e) => { setQty(e.target.value) }} /></div>
    <div>Total Calories: {totalCalories}</div>
    <button onClick={addFood}>Add Food</button>
  </div>
)
}

export default AddNutrition;

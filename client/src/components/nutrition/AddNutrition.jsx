import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import NutritionList from './NutritionList.jsx';

const AddNutrition = () => {

  const [foodSearchName, setFoodSearchName] = useState('');
  const [foodName, setFoodName] = useState('');
  const [servingSize, setServingSize] = useState(0);
  const [calories, setCalories] = useState(0);
  const [qty, setQty] = useState(1);
  const [totalCalories, setTotalCalories] = useState(0);

  // Search Food thru API
  function searchFood() {
    if (foodSearchName !== '') {
      axios.get('/Nutrition', { params: { foodSearchName: foodSearchName } })
        .then((data) => {
          if (data.data === '') {
            alert("Please enter a valid food");
          } else {
            setFoodName(data.data.name);
            setCalories(data.data.calories);
            setServingSize(data.data.serving_size_g);
          }
        })
        .catch((err) => {
          console.log('err', err);
        })
    }
  };

  useEffect(() => {
    if (foodSearchName === '') {
      setFoodName('');
      setServingSize(0);
      setCalories(0);
      setQty(1);
    }
  }, [foodSearchName]);

  function addFood() {
    // add data into the database
    var date = new Date();
    var currentDate = date.toUTCString();

    var postData = {
      userId: 1, // need retrieve the user_id as props
      date: currentDate,
      foodName: foodName,
      qty: qty,
      totalCalories: totalCalories
    }

    if (postData.foodName === '') {
      alert('Please enter the food');
    } else {
      axios.post('/Nutrition', postData)
        .then((data) => {
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        })

      // reset all numbers to default, once FoodSearchName is empty, it will trigger the above useEffect()
      setFoodSearchName('');
    }
  };

  // Total calories should be recalculated once qty or food calories changed
  useEffect(() => {
    setTotalCalories(qty * calories);
  }, [qty, calories]);

  function displayNutritionList() {
    ReactDOM.render(<NutritionList />, document.getElementById('app'));
  }

  return (
    <div>
      <input type="text" placeholder="Please enter the food" value={foodSearchName} onChange={(e) => { setFoodSearchName(e.target.value) }} />
      <button onClick={searchFood}>Search</button>
      <div>Food: {foodName}</div>
      <div>Serving Size (g): {servingSize}</div>
      <div>Calories: {calories}</div>
      <div>Qty: <input type="text" value={qty} onChange={(e) => { setQty(e.target.value) }} /></div>
      <div>Total Calories: {totalCalories}</div>
      <button onClick={addFood}>Add Food</button>
      <button>Home</button>
      <button onClick={displayNutritionList}>Nutrition List</button>
    </div>
  )
}

export default AddNutrition;

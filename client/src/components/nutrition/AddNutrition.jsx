import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import NutritionList from './NutritionList.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const AddNutrition = (props) => {

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
    // Guest cannot add any food into the database
    if (props.userId === null) {
      alert('Please log in!');
    } else {
      // add data into the database
      var postData = {
        userId: props.userId,
        foodName: foodName,
        qty: qty,
        totalCalories: totalCalories.toFixed(1)
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
    }
  };

  // Total calories should be recalculated once qty or food calories changed
  useEffect(() => {
    setTotalCalories(qty * calories);
  }, [qty, calories]);

  const navigate = useNavigate();
  // Navigate to the Nutrition List page
  function goToNutritionList() {
    // Guest cannot check the nutrition list
    if (props.userId === null) {
      alert('Please log in!');
    } else {
      navigate('/nutritionList');
    }
  }

  return (
    <div>
      {/* <input type="text" placeholder="Please enter the food" value={foodSearchName} onChange={(e) => { setFoodSearchName(e.target.value) }} /> */}
      <div>
        <TextField
          id="outlined-search"
          label="Please search the food"
          type="search"
          value={foodSearchName}
          onChange={(e) => { setFoodSearchName(e.target.value) }} />
        <Button onClick={searchFood} variant="outlined">Search</Button>
      </div >
      <div></div>
      <br></br>
      <div>Food: {foodName}</div>
      <br></br>
      <div>Serving Size (g): {servingSize}</div>
      <br></br>
      <div>Calories: {calories}</div>
      <br></br>
      <div>Qty: <input type='number' value={qty} onChange={(e) => { setQty(e.target.value) }} /></div>
      <div></div>
      <br></br>
      <div>Total Calories: {totalCalories.toFixed(1)}</div>
      <br></br>
      <Button onClick={addFood} variant="outlined">Add Food</Button>
      <Button onClick={goToNutritionList} variant="outlined">Nutrition List</Button>
      {/* <button onClick={goToNutritionList}>Nutrition List</button> */}
    </div>
  )
}

export default AddNutrition;

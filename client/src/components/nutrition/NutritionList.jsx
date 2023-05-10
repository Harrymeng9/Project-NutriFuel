import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import NutritionEntry from './NutritionEntry.jsx';
import Nutrition from './Nutrition.jsx';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';

const NutritionList = (props) => {

  const [nutritionList, setNutritionList] = useState([]);
  useEffect(() => {
    axios.get('/NutritionList')
      .then((data) => {
        setNutritionList(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [nutritionList])

  const navigate = useNavigate();
  // Navigate to the Nutrition page
  function goToNutritionPage() {
    navigate('/nutrition');
  };

  // Navigate to the Dashboard page
  function goToDashboardPage() {
    navigate('/');
  };

  return (
    <div>
      <h2>Nutrition List</h2>
      <div>
        {nutritionList.map((result, i) => {
          return (
            <div key={i}>
              <NutritionEntry nutrition_id={result.nutrition_id} date={result.date} food_name={result.food_name} qty={result.qty} total_calories={result.total_calories} />
            </div>
          )
        })}
      </div>
      <button onClick={goToNutritionPage}>Back</button>
      <button onClick={goToDashboardPage}>Dashboard</button>
    </div>
  )
}

export default NutritionList;
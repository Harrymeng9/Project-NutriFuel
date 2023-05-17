import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import NutritionEntry from './NutritionEntry.jsx';
import Nutrition from './Nutrition.jsx';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NutritionList = (props) => {

  var date = new Date();
  const options = { timeZone: 'America/Los_Angeles' };
  const pacificTime = date.toLocaleString('en-US', options);
  date = pacificTime;

  const [nutritionList, setNutritionList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(date));
  const [dailyCalories, setDailyCalories] = useState(0);

  useEffect(() => {
    axios.get('/NutritionList', { params: { selectedDate: selectedDate } })
      .then((data) => {
        setNutritionList(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [nutritionList, selectedDate]);

  // Get the daily total calories for a specific date
  useEffect(() => {
    axios.get('/dailyCalories', { params: { selectedDate: selectedDate } })
      .then((data) => {
        setDailyCalories(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [nutritionList, selectedDate]);

  const navigate = useNavigate();
  // Navigate to the Nutrition page
  function goToNutritionPage() {
    navigate('/nutrition');
  };

  // Navigate to the Dashboard page
  function goToDashboardPage() {
    navigate('/');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Nutrition List</h2>
      <h3>Please select a date</h3>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd" />
      </div>
      <h3>Daily Total Calories: {dailyCalories}</h3>
      <h3>All Records</h3>
      <div>
        {nutritionList.map((result, i) => {
          const dateOnly = result.date.substring(0, 10);
          return (
            <div key={i}>
              <NutritionEntry nutrition_id={result.nutrition_id} date={dateOnly} food_name={result.food_name} qty={result.qty} total_calories={result.total_calories} />
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
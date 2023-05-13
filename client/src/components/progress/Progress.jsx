import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const Progress = () => {
  // Navigate to the Dashboard page
  const navigate = useNavigate();

  function goToDashboardPage() {
    navigate('/');
  };

  useEffect(() => {
    axios.get('/ProgressNutrition')
      .then((data) => {
        console.log('test0', Number(data.data[0].sum));
        // var sumCalories = data.data[0].sum;
        // console.log('test1', sumCalories, typeof sumCalories);
        // sumCalories = Number(sumCalories);
        // console.log('test2', sumCalories, typeof sumCalories);
        // console.log('works', data.data[0].sum, typeof data.data[0].sum);
      })
      .catch((err) => {
        console.log('not work');
      })
  }, []);

  const data = {
    labels: ['05/12/2023', '05/13/2023', '05/14/2023', '05/15/2023'],
    datasets: [{
      data: [8, 7, 9, 2]
    }]
  };

  const options = [];

  return (
    <div>
      <h2>Progress Section</h2>
      <div>
        <Line data={data} options={options}></Line>
      </div>
      <button onClick={goToDashboardPage}>Dashboard</button>
    </div>
  )
}

export default Progress;
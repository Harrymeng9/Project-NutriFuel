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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navigation from '../navigation/navigation.jsx';

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const Progress = (props) => {
  var userId = props.userInfo.current.uid;

  var date = new Date();
  const timeOptions = { timeZone: 'America/Los_Angeles' };
  const pacificTime = date.toLocaleString('en-US', timeOptions);
  date = pacificTime;

  const [startDate, setStartDate] = useState(new Date(date));
  const [endDate, setEndDate] = useState(new Date(date));
  const [xDates, setXDates] = useState([]);
  const [yCalories, setYCalories] = useState([]);

  useEffect(() => {
    axios.get('/ProgressNutrition', { params: { user_id: userId, startDate: startDate, endDate: endDate } })
      .then((data) => {
        setXDates(data.data[0]);
        setYCalories(data.data[1]);
      })
      .catch((err) => {
        console.log('Err', err);
      })
  }, [startDate, endDate]);

  const data = {
    labels: xDates,
    datasets: [{
      data: yCalories
    }]
  };

  const handleStartDateChange = (date) => {
    if (date.getTime() > endDate.getTime()) {
      alert('Please enter a valid date');
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date.getTime() < startDate.getTime()) {
      alert('Please enter a valid date');
    } else {
      setEndDate(date);
    }
  };

  const options = [];

  return (
    <div>
      <h1>Progress Section</h1>
      <div>Please select the start date</div>
      <br></br>
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy-MM-dd" />
      </div>
      <br></br>
      <div>Please select the end date</div>
      <br></br>
      <div>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="yyyy-MM-dd" />
      </div>
      <br></br>
      <div>
        <Line data={data} options={options}></Line>
      </div>
      <Navigation userInfo={props.userInfo} auth={props.auth} />
    </div>
  )
}

export default Progress;
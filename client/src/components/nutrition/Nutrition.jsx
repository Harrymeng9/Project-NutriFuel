import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import AddNutrition from './AddNutrition.jsx';
import { Routes, Route, Link } from "react-router-dom";
import Navigation from '../navigation/navigation.jsx';

const Nutrition = (props) => {

  return (
    <div>
      <h1>Nutrition Section</h1>
      <AddNutrition userId = {props.userInfo.current.uid}/>
      <Navigation userInfo={props.userInfo} auth={props.auth} />
    </div>
  )
}

export default Nutrition;
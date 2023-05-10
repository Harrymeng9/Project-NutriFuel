import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';
import NutritionEntry from './NutritionEntry.jsx';
import Nutrition from './Nutrition.jsx';

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

  function backToNutritionPage() {
    ReactDOM.render(<Nutrition />, document.getElementById('app'));
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
      <button onClick={backToNutritionPage}>Back</button>
    </div>
  )
}

export default NutritionList;
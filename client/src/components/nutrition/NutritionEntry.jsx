import ReactDOM from 'react-dom';
import React from 'react';
const axios = require('axios');
import { useEffect, useState } from 'react';

const NutritionEntry = (props) => {

  const [editable, setEditable] = useState(false);
  const [adjustQty, setAdjustQty] = useState(props.qty);
  const [adjustTotalCalories, setAdjustTotalCalories] = useState(0);

  const handleToggleEdit = () => {
    // If the adjust qty is different with original qty, then trigger the axios.put request to update it
    if (editable && adjustQty !== props.qty) {
      axios.put('/NutritionlistUpdate', { nutrition_id: props.nutrition_id, food_name : props.food_name, qty: adjustQty, total_calories: adjustTotalCalories })
        .then((data) => {
          console.log('Update it successfully!');
        })
        .catch((err) => {
          console.log('Err', err);
        })
    }
    setEditable(!editable);
  };

  const handleQtyChange = (event) => {
    setAdjustQty(event.target.value);
  };

  function deleteFood() {
    axios.put('/NutritionListDelete', { nutrition_id: props.nutrition_id })
      .then((data) => {
        console.log('Delete it successfully!');
      })
      .catch((err) => {
        console.log('Err', err);
      })
  };

  return (
    <div>
      <div>Date: {props.date}</div>
      <div>Food: {props.food_name}</div>
      <div>{editable ? (<div>Qty:
        <input type='text' value={adjustQty} onChange={handleQtyChange} /> </div>
      ) : (<div>Qty: {props.qty}</div>)}
      </div>
      < div > Total Calories:  {props.total_calories}</div>
      <button onClick={handleToggleEdit}>{editable ? 'Save' : 'Edit'}</button>
      <button onClick={deleteFood}>Delete</button>
      <div></div>
      <br></br>
    </div>
  )
}

export default NutritionEntry;
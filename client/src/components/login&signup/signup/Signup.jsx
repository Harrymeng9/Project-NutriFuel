import ReactDOM from 'react-dom';
import React from 'react';

import TextBox from '../components/interactables/TextBox.jsx'
import Button from '../components/interactables/Button.jsx'

import '../style.css';



export default function Signup (){

  return (
    <>
      <Title/>
      <SignupSection/>
    </>
  )
}


var Title = function (){
  return (
    <div id='Title'>NutriFuel</div>
  );
};
var SignupSection = function (){

  return (
    <div id="SigninSection" className="col-3">
      <TextBox defaultText={'Username'}/>
      <TextBox defaultText={'Email'}/>
      <TextBox defaultText={'Password'} password={true}/>
      <TextBox defaultText={'Confirm Password'} password={true}/>
      <Button text={'Signup'}/>
    </div>
  );
};

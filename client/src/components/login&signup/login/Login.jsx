import ReactDOM from 'react-dom';
import React from 'react';

import TextBox from '../../components/interactables/TextBox.jsx'
import Button from '../../components/interactables/Button.jsx'

import '../style.css';

export default function Login (){

  return (
    <>
      <Title/>
      <LoginSection/>
    </>
  )
}


var Title = function (){
  return (
    <div id='Title'>NutriFuel</div>
  );
};
var LoginSection = function (){

  return (
    <div id="LoginSection" className="col-3">
      <TextBox defaultText={'Username'}/>
      <TextBox defaultText={'Password'} password={true}/>
      <Button text={'Login'}/>
    </div>
  );
};

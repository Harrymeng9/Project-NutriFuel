import ReactDOM from 'react-dom';
import React from 'react';

import TextBox from './interactables/TextBox.jsx'
import Button from './interactables/Button.jsx'


export default function App (){

  return (
    <>
      <h1>This is the login page</h1>
      <LoginSection/>
    </>
  )
}


var LoginSection = function (){

  return (

    <div id="LoginSection" className="col-3">
      <TextBox defaultText={'Username'}/>
      <TextBox defaultText={'Password'}/>
      <Button text={'Login'}/>
    </div>
  );
};
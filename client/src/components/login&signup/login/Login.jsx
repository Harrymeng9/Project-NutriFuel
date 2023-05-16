import ReactDOM from 'react-dom';
import React from 'react';
import {useRef, useState} from 'react';

import TextBox from '../components/interactables/TextBox.jsx'
import Button from '../components/interactables/Button.jsx'

import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword , signInAnonymously } from "firebase/auth";


import '../style.css';

export default function Login ({userInfo, auth}){

  var [showError, setShowError] = useState(false);

  return (
    <>
      <Title/>
      <LoginSection userInfo={userInfo} auth={auth} setShowError={setShowError}/>
      <Error showError={showError}/>
    </>
  )
}


var Title = function (){
  return (
    <div id='Title'>NutriFuel</div>
  );
};

var LoginSection = function ({userInfo, auth, setShowError}){

  const loginInfo = useRef({
    email: '',
    password: '',
  });

  const sendLogin = function (){
    setShowError(false);
    signInWithEmailAndPassword(auth, loginInfo.current.email, loginInfo.current.password)
    .then((userCrediential)=>{
      userInfo.current = {
        uid: userCrediential.user.uid,
        email: loginInfo.current.email,
        //username: signupInfo.current.username
      };
      navigate('/');
    })
    .catch((error)=>{
      console.log(error.message);
      //email or password is incorrect
      setShowError(true);
    });
  };

  const loginAsGuest = function (){
    signInAnonymously(auth)
    .then(()=>{
      navigate('/');
    });
  };

  const navigate = useNavigate();
  return (
    <div id="LoginSection" className="col-3">
      <TextBox defaultText={'Email'} onChange={(e)=>{loginInfo.current.email = e.target.value}}/>
      <TextBox defaultText={'Password'} onChange={(e)=>{loginInfo.current.password = e.target.value}} isPassword={true}/>
      <Button text={'Login'} onClick={sendLogin}/>
      <Button text={'Create Account'} onClick={()=>{navigate('/signup')}}/>
      <Button text={'Login as Guest'} onClick={loginAsGuest}/>

    </div>
  );
};

var Error = function ({showError}){
  if (showError) {
    return (
      <div>
        incorrect email or password
      </div>
    );
  }
}
import ReactDOM from 'react-dom';
import React from 'react';
import {useRef, useState} from 'react';


import TextBox from '../components/interactables/TextBox.jsx'
import Button from '../components/interactables/Button.jsx'

import '../style.css';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Signup ({userInfo, auth}){

  var [showError, setShowError] = useState('');


  return (
    <>
      <Title/>
      <SignupSection userInfo={userInfo} auth={auth} setShowError={setShowError}/>
      <Error showError={showError} />

    </>
  )
}


var Title = function (){
  return (
    <div id='Title'>NutriFuel</div>
  );
};

var SignupSection = function ({userInfo, auth, setShowError}){

  const navigate = useNavigate();


  const signupInfo = useRef({
    username: '',
    email: '',
    password:'',
    confirmPassword: '',
  });

  const sendSignupInfo = function (){
    setShowError('');

    //check if the passwords match
    if (signupInfo.current.password === signupInfo.current.confirmPassword) {
      //create the user with firebase
      createUserWithEmailAndPassword(auth, signupInfo.current.email, signupInfo.current.password)
        .then((userCrediential)=>{
          //update the userInfo Ref
          userInfo.current = {
            loggedIn: true,
            uid: userCrediential.user.uid,
            token: null
          };
          //send the uid and username to our server to save
          axios.post('/signup', {
            uid: userInfo.current.uid,
            username: signupInfo.current.username
          })
            .then(()=>{
              console.log('running');
              navigate('/');
            });
        })
        .catch((error)=>{
          console.log(error);
          setShowError('password is too weak');
        });
    } else {
      setShowError('passwords do not match');

    }

  };

  return (
    <div id="SigninSection" >
      <TextBox defaultText={'Username'} onChange={(e)=>{signupInfo.current.username = e.target.value}}/>
      <TextBox defaultText={'Email'} onChange={(e)=>{signupInfo.current.email = e.target.value}}/>
      <TextBox defaultText={'Password'} onChange={(e)=>{signupInfo.current.password = e.target.value}} isPassword={true}/>
      <TextBox defaultText={'Confirm Password'} onChange={(e)=>{signupInfo.current.confirmPassword = e.target.value}} isPassword={true}/>
      <Button text={'Signup'} onClick={sendSignupInfo}/>
    </div>
  );
};

var Error = function ({showError}){
  if (showError) {
    return (
      <div>
        {showError}
      </div>
    );
  }
}
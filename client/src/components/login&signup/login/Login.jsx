import ReactDOM from 'react-dom';
import React from 'react';
import {useRef, useState} from 'react';

//import TextBox from '../components/interactables/TextBox.jsx'
//import Button from '../components/interactables/Button.jsx'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword , signInAnonymously } from "firebase/auth";


//import '../style.css';

export default function Login ({userInfo, auth}){

  var [showError, setShowError] = useState(false);

  return (
    <>
      <Stack spacing={12} justifyContent="space-between">
        <Title/>
        <LoginSection userInfo={userInfo} auth={auth} setShowError={setShowError}/>
        <Error showError={showError}/>
      </Stack>
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
    <div id="LoginSection" >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label={'Email'} onChange={(e)=>{loginInfo.current.email = e.target.value}}/>
        </Grid>
        <Grid item xs={12}>
        <TextField fullWidth label={'Password'} onChange={(e)=>{loginInfo.current.password = e.target.value}} type={'password'}/>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' onClick={sendLogin}>Login</Button>
        </Grid>
        <Grid item l={6}>
          <Button variant='contained' onClick={()=>{navigate('/signup')}}>Create Account</Button>
        </Grid>
        <Grid item l={6}>
          <Button variant='contained' onClick={loginAsGuest}>Login as Guest</Button>
        </Grid>
      </Grid>


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
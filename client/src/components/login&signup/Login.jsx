import ReactDOM from 'react-dom';
import React from 'react';
import {useRef, useState} from 'react';



import {Button, TextField, Grid, Box, Container, Stack, Alert, Typography} from '@mui/material/';



import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword , signInAnonymously } from "firebase/auth";


//import '../style.css';

export default function Login ({userInfo, auth}){

  var [showError, setShowError] = useState(false);

  return (
    <>
      <Title/>

      <Container sx={{display:'flex', justifyContent: "center"}}>
        <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{height: '85vh'}}>
          <LoginSection userInfo={userInfo} auth={auth} setShowError={setShowError}/>
          <Error showError={showError}/>
          <FPButton/>
        </Stack>
      </Container>
    </>
  )
}


var Title = function (){
  return (
    <>
    <Box sx={{width:'100vw', 'textAlign': 'center' }}>
      <h1>NutriFuel</h1>
    </Box>
    </>
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
    <>
      <Grid container spacing={2} sx={{mt:'30vh', maxWidth: '500px'}}>
        <Grid item xs={12}>
          <TextField fullWidth label={'Email'} onChange={(e)=>{loginInfo.current.email = e.target.value}}/>
        </Grid>
        <Grid item xs={12}>
        <TextField fullWidth label={'Password'} onChange={(e)=>{loginInfo.current.password = e.target.value}} type={'password'}/>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' onClick={sendLogin} sx={{width:'100%'}}>Login</Button>
        </Grid>
        <Grid item l={6}>
          <Button variant='outlined' onClick={()=>{navigate('/signup')}}>Create Account</Button>
        </Grid>
        <Grid item l={6}>
          <Button variant='outlined' onClick={loginAsGuest}>Login as Guest</Button>
        </Grid>
      </Grid>


    </>
  );
};

var Error = function ({showError}){
  if (showError) {
    return (
      <Alert severity="error" sx={{mt: '10px'}}>Incorrect email or password</Alert>
    );
  }
}

var FPButton = function (){

  const navigate = useNavigate();

  return (
    <Typography variant="body1" sx={{color: 'text.secondary'}} onClick={()=>{navigate('/forgotpassword')}}>Forgot password?</Typography>
  );
};
import ReactDOM from 'react-dom';
import React from 'react';
import {useRef, useState} from 'react';



import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

// import '../style.css';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Signup ({userInfo, auth}){

  var [showError, setShowError] = useState('');


  return (
    <>
      <Title/>

      <Container sx={{display:'flex', justifyContent: "center"}}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <SignupSection userInfo={userInfo} auth={auth} setShowError={setShowError}/>
          <Error showError={showError} />
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

      if (signupInfo.current.username !== '') {

        //create the user with firebase
        createUserWithEmailAndPassword(auth, signupInfo.current.email, signupInfo.current.password)
          .then((userCrediential)=>{
            //update the userInfo Ref
            userInfo.current = {
              uid: userCrediential.user.uid,
              email: signupInfo.current.email,
              username: signupInfo.current.username
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
            setShowError(error.code);
          });
      } else {
        setShowError('please enter a username');

      }
    } else {
      setShowError('passwords do not match');

    }

  };

  return (
    <>
    <Grid container spacing={2} sx={{mt:'30vh', maxWidth: '500px'}}>
        <Grid item xs={12}>
        <TextField label={'Username'} onChange={(e)=>{signupInfo.current.username = e.target.value}} fullWidth/>
        </Grid>
        <Grid item xs={12}>
        <TextField label={'Email'} onChange={(e)=>{signupInfo.current.email = e.target.value}} fullWidth/>
        </Grid>
        <Grid item xs={12}>
        <TextField label={'Password'} onChange={(e)=>{signupInfo.current.password = e.target.value}} type="password" fullWidth/>
        </Grid>
        <Grid item xs={12}>
        <TextField label={'Confirm Password'} onChange={(e)=>{signupInfo.current.confirmPassword = e.target.value}} type="password" fullWidth/>
        </Grid>
        <Grid item l={6}>
        <Button variant='contained' onClick={sendSignupInfo}>Signup</Button>
        </Grid>
      </Grid>
    </>
  );
};

var Error = function ({showError}){
  if (showError) {
    return (
      <Alert severity="error" sx={{mt: '10px'}}>{showError}</Alert>

    );
  }
}
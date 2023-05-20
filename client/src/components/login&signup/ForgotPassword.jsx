import React from 'react';
import {useRef, useState} from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import {Button, TextField, Grid, Box, Container, Stack, Alert} from '@mui/material/';


export default function ForgotPassword ({auth}){

  var email = useRef('');
  var [showSuccess, setShowSuccess] = useState(false);

  return (
    <>


      <Container sx={{display:'flex', justifyContent: "center"}}>
        <Stack direction="column" justifyContent="center" alignItems="center">
        <Title/>
          <EmailEntry email={email} auth={auth} setShowSuccess={setShowSuccess}/>
          <SuccessMessage showSuccess={showSuccess}/>
        </Stack>
      </Container>


    </>
  )
};

var Title = function (){
  return (
    <img src="/image.png" width="100%"/>
  );
};

var EmailEntry = function ({email, auth, setShowSuccess}){

  const navigate = useNavigate();

  var sendEmail = function (){
    sendPasswordResetEmail(auth, email.current)
            .then(() => {
              setShowSuccess(true);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error);
            });
  };
  return (
    <Grid container spacing={2} sx={{mt:'30vh', maxWidth: '500px'}}>
        <Grid item xs={12}>
          <TextField fullWidth label={'Email'} onChange={(e)=>{email.current = e.target.value}}/>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' sx={{width:'100%'}} onClick={sendEmail}>Send Email</Button>
        </Grid>
        <Grid item l={6}>
        <Button variant='outlined' onClick={()=>{navigate('/login')}}>Back</Button>
        </Grid>
      </Grid>
  );
}

var SuccessMessage = function ({showSuccess}){
  if (showSuccess) {
    return (
      <Alert severity="success">Email sent!</Alert>
    );
  }
}

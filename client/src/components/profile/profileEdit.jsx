import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Profile from './profile.jsx';



const axios = require('axios');


const ProfileEdit = ({auth, userInfo}) => {
  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [food, setFood] = useState("");
  const [exercise, setExercise] = useState("");


  useEffect(() => {
    axios.get('/profile', { params: { "uid": userInfo.current.uid} })
      .then((data) => {
        setUsername(data.data.username);
        setPhoto(data.data.photo ? data.data.photo:'');
        setFood(data.data.food_favor ? data.data.food_favor:'');
        setExercise(data.data.exercise_favor ? data.data.exercise_favor:'');
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
    , []);

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      uid:userInfo.current.uid,
      photo: photo.toString(),
      food: food,
      exercise: exercise,
    };
    axios.put('/profileedit', null, { params: obj})
    .then((data) => {
      console.log('profile info updated');
      navigate("/profile");
    })
    .catch((err) => {
      console.log('prifile update error', err);
    });
    
  }


  return (
    <div>
      <Typography component="h1" variant="h5">
         Edit Profile
      </Typography>
      <Container component="main">


        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              multiline
              id="outlined-helperText" 
              label="avatar photo link"
              defaultValue={photo}
              onChange={e => setPhoto(e.target.value)}
            />
            <TextField
              multiline
              id="outlined-helperText" 
              label="favorite food"
              defaultValue={food}
              onChange={e => setFood(e.target.value)}
            />
            <TextField
              multiline
              id="outlined-helperText" 
              label="favorite exercise"
              defaultValue={exercise}
              onChange={e => setExercise(e.target.value)}
            />



          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit"
              onClick={onSubmit}
            >
              Update
            </Button>

          </div>


        </Box>

      </Container>

    </div>
  )
}

export default ProfileEdit;

// https://stackoverflow.com/questions/69294847/issue-in-textfield-default-value-set-using-the-useeffect-hook-in-the-material-ui
// https://codesandbox.io/s/form-validation-lfo2o?file=/demo.js:2096-2184
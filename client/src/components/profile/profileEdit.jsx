import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Profile from './profile.jsx';



const axios = require('axios');


const ProfileEdit = () => {

  const [profileData, setProfileData] = useState({});

  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [food, setFood] = useState("");
  const [exercise, setExercise] = useState("");




  useEffect(() => {
    axios.get('/profile', { params: { "user_id": 1 } })
      .then((data) => {
        setProfileData(data.data);
        setPhoto(data.data.photo);
        setUsername(data.data.username);
        setFood(data.data.food_favor);
        setExercise(data.data.exercise_favor);
        setEmail(data.data.email);
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
    , []);

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({
      username: username,
      photo: photo,
      email: email,
      food_favor: food,
      exercise_favor: exercise,
    });

    navigate("/profile");
  }


  return (
    <div>
      <Typography component="h1" variant="h5">
        Profile Edit
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
              id="outlined-basic" variant="outlined"
              label="avatar photo link"
              defaultValue={photo}
              onChange={e => setPhoto(e.target.value)}
            />
            <TextField
              required
              multiline
              id="outlined-basic" variant="outlined"
              label="username"
              defaultValue={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              required
              multiline
              id="outlined-basic" variant="outlined"
              label="email adress"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              multiline
              id="outlined-basic" variant="outlined"
              label="favorite food"
              defaultValue={food}
              onChange={e => setFood(e.target.value)}
            />
            <TextField
              multiline
              id="outlined-basic" variant="outlined"
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
import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const axios = require('axios');


const ProfileEdit = () => {

  const [profileData, setProfileData] = useState({});


  useEffect(() => {
    axios.get('/profile', { params: { "user_id": 1 } })
      .then((data) => {
        setProfileData(data.data);
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
    , []);


  return (
    <div>
      <h2>Profile Edit</h2>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required 
            id="outlined-basic" variant="outlined"
            label="username"
            defaultValue={profileData.username}
            multiline
          />
        </div>
      </Box>

    </div>
  )
}

export default ProfileEdit;

// https://stackoverflow.com/questions/69294847/issue-in-textfield-default-value-set-using-the-useeffect-hook-in-the-material-ui
import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";


import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const axios = require('axios');


const Changepw = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  
  const onSubmit = (e) => {

    navigate("/profile");
  }


  return (
    <div>
      <Typography component="h1" variant="h5">
        change Password 
      </Typography>
      <Container component="main">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '10ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>

          <TextField id="standard-basic" label="Current PassWord" variant="filled" />
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit"
              onClick={onSubmit}
            >
              Enter
            </Button>

          </div>


        </Box>

      </Container>

    </div>
  )
}

export default Changepw;
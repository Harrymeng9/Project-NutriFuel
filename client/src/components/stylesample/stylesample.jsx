import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


import { ThemeProvider, createTheme } from '@mui/material/styles';





const StyleSample = ({ }) => {

  const theme = createTheme({
    palette: {
      primary: {
        light: "#4CB963",
        main: "#157F1F",
        dark: "#1D263B",
        contrastText: "#5C67B4"
      }
    },
  });

  // https://codesandbox.io/s/omq85e?file=/demo.js:397-1061

  const [open, setOpen] = useState(true);


  return (
    <div>
      <div>styles</div>
      <ThemeProvider theme={theme}>

        <TextField label={'Username'} />
        <TextField
          id="filled-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
        <Button variant="outlined" >Log Out</Button>

        <Typography variant="h4" gutterBottom>
          h4. Heading
        </Typography>
        <Typography variant="h5" gutterBottom>
          h5. Heading
        </Typography>


        <List>
          <ListItem>
            <ListItemText primary="email" secondary="111" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Favorite Food" secondary="222" />
          </ListItem>
        </List>

        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Close me!
            </Alert>
          </Collapse>
          <Button
            disabled={open}
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            Re-open
          </Button>
        </Box>


      </ThemeProvider>





    </div>
  );
}

export default StyleSample;

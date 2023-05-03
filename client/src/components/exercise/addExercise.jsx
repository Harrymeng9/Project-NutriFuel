import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const AddExercise = () => {

  function fetchExercises (e) {
    var muscle = e.target.value
    axios({
      method: 'get',
      url: 'https://api-ninjas.com/api/exercises/v1/exercises?muscle=' + muscle,
      headers: {
        'X-Api-Key': 'v9CqesqX5ys6rlModj/Riw==qC0eVhKYsz1MF3tN'
      },
      contentType: 'application/json',
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      if (err) {
        console.log('fetchExercises err', err);
      }
    })
  }

  return (
    <div>
      <h1>Add Exercise</h1>
      <h2>Select muscle group</h2>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="body-part">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Chest" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemText primary="Back" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemText primary="Shoulders" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemText primary="Legs" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemText primary="Arms" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      <div>
        exercise list here
      </div>
      <button>Add Exercise to Log</button>
    </div>
  )
}

export default AddExercise;
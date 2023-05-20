import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import ProfileEdit from './profileEdit.jsx';
import { Avatar, Button, List, ListItem, ListItemText, Divider, Container, Typography, Box, Grid, Collapse, Alert, IconButton} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';


import { sendPasswordResetEmail, signOut } from 'firebase/auth';
const axios = require('axios');
import Navigation from '../navigation/navigation.jsx';


const Profile = ({ userInfo, auth }) => {
  const [profileData, setProfileData] = useState({});
  const [friendsCount, setFriendsCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('/profile', { params: { "uid": userInfo.current.uid } })
      .then((data) => {
        setProfileData(data.data);
        setFriendsCount(0);
        axios.get('/friendlist', { params: { "user": String(data.data.username) } })
          .then((data) => {
            setFriendsCount(data.data.length);
          })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
    , []);
  return (
    <div>


      <Grid container justifyContent="center" >
        <Typography component="h1" variant="h5" sx={{ width: '100vw', 'textAlign': 'center' }}>
          Profile
        </Typography>
        <Avatar
          alt={profileData.username}
          src={profileData.photo}
          sx={{
            width: 120,
            height: 120,
            border: '3px solid',
            fontWeight: 'bold',
            align: "center"
          }}
        />
      </Grid>
      <Typography variant="h6" sx={{ 'textAlign': 'center' }} >
        {profileData.username}
      </Typography>
      <Typography variant="subtitle1" sx={{ 'textAlign': 'center' }} >
        {friendsCount} Friends
      </Typography>
      <br></br>


      <div>
        <Link to="/profileedit">
          <Button variant="outlined">Edit Profile</Button>
        </Link>
      </div>
      <List>

        <ListItem>
          <ListItemText primary="Email" secondary={userInfo.current.email} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Favorite Food" secondary={profileData.food_favor} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Favorite Exersice" secondary={profileData.exercise_favor} />
        </ListItem>
        <Divider />
      </List>
      <Button variant="outlined" onClick={() => {
        sendPasswordResetEmail(auth, userInfo.current.email)
          .then(() => {
            setOpen(true)
            console.log('password reset email sent!')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }}>Reset Password</Button>
      <Button variant="outlined" onClick={() => { userInfo.current = { uid: null, email: null }; signOut(auth) }}>Log Out</Button>
      <Navigation userInfo={userInfo} auth={auth} alignItems="center" />

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
              Password reset email sent!
            </Alert>
          </Collapse>
        </Box>
    </div>
  )
}
export default Profile;
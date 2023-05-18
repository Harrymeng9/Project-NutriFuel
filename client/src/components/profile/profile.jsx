import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import ProfileEdit from './profileEdit.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
const axios = require('axios');
import Navigation from '../navigation/navigation.jsx';


const Profile = ({ userInfo, auth }) => {
  const [profileData, setProfileData] = useState({});
  const [friendsCount, setFriendsCount] = useState(0);

  useEffect(() => {
    axios.get('/profile', { params: { "uid": userInfo.current.uid } })
      .then((data) => {
        setProfileData(data.data);
        setFriendsCount(0);
        axios.get('/friendlist', { params: { "user": String(data.data.username) } })
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
      <h2>Profile</h2>
      <Avatar
        alt={profileData.username}
        src={profileData.photo}
        sx={{
          width: 100,
          height: 100,
          border: '1px solid',
          fontWeight: 'bold',
        }}
      />
      <h3>{profileData.username}</h3>
      <div>{friendsCount} Friends</div>
      <></>
      <div>
        <Link to="/profileedit">
          <Button variant="outlined">Edit</Button>
        </Link>
        <Button variant="outlined" onClick={() => {
          sendPasswordResetEmail(auth, userInfo.current.email)
            .then(() => {
              console.log('password reset email sent!')
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        }}>Reset Password</Button>
      </div>
      <List>
        <ListItem>
          <ListItemText primary="email" secondary={userInfo.current.email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Favorite Food" secondary={profileData.food_favor} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Favorite Exersice" secondary={profileData.exercise_favor} />
        </ListItem>
      </List>
      <Button variant="outlined" onClick={() => { userInfo.current = {uid: null, email: null}; signOut(auth) }}>Log Out</Button>
      <Navigation />
    </div>
  )
}
export default Profile;
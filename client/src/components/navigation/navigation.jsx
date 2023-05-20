import ReactDOM from 'react-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GridViewIcon from '@mui/icons-material/GridView';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChatIcon from '@mui/icons-material/Chat';
import ProgressIcon from '@mui/icons-material/ShowChart';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const Navigation = ({ auth, userInfo, notification, mainpage }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function goToProgressPage() {
    // Guest cannot access the progress page
    console.log('test', userInfo);
    if (userInfo === undefined || userInfo.current.uid === null) {
      alert('Please log in');
    } else {
      navigate('/progress')
    }
  };

  function goToProfilePage() {
    // Guest cannot access the profile page
    if (userInfo === undefined || userInfo.current.uid === null) {
      alert('Please log in');
    } else {
      navigate('/profile');
    }
  };

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 999,
        zoom: screen.width > 480 ? 1 : screen.width / 480,
      }}>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" onClick={(e) => navigate('/')} icon={<GridViewIcon />} />
        <BottomNavigationAction label="Exercise" onClick={(e) => navigate('/exerciseMain')} icon={<FitnessCenterIcon />} />
        <BottomNavigationAction label="Nutrition" onClick={(e) => navigate('/nutrition')} icon={<RestaurantIcon />} />
        <BottomNavigationAction label="Progress" onClick={goToProgressPage} icon={<ProgressIcon />} />
        <BottomNavigationAction label="Community" sx={{
          color: notification && mainpage ? 'red' : 'none'
        }} onClick={(e) => navigate('/friendNChat')} icon={<ChatIcon />} />
        <BottomNavigationAction label="Profile" onClick={goToProfilePage} icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Navigation;

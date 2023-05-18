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


const Navigation = ({ auth, userInfo }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  return (
    <Box >
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
        <BottomNavigationAction label="Friends & Chat" onClick={(e) => navigate('/friendNChat')} icon={<ChatIcon />} />
        <BottomNavigationAction label="Profile" onClick={(e) => navigate('/profile')} icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Navigation;

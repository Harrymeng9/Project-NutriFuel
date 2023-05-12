import ReactDOM from 'react-dom';
import React from 'react';
import { useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import ExerciseMain from './exercise/exerciseMain.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import NutritionList from './nutrition/NutritionList.jsx';
//import FriendNChat from './friendlist&&chat/friend&chat.jsx';
import Profile from './profile/profile.jsx';
import ProfileEdit from './profile/profileEdit.jsx';
import Changepw from './profile/changepw.jsx';

import Login from './login&signup/login/Login.jsx';
import Signup from './login&signup/signup/Signup.jsx';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from './firebase-config.js'

const App = () => {
  const navigate = useNavigate();


  const userInfo = useRef({
    loggedIn: false,
    uid: null,
    token: null,
  });

  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      console.log(user);
      if(user) {
        user.getIdToken()
        .then((token)=>{
          console.log(token);
        });
      } else {
        navigate('/login');
      }
    })
  },[]);






  function Dashboard({auth, signOut}) {

    function goToExercisePage() {
      navigate('/exerciseMain');
    }
    function goToNutritionPage() {
      navigate('/nutrition');
    }
    function goToProgressPage() {
      navigate('/progress');
    }
    function goToUserProfilePage() {
      navigate('/profile');
    }
    function goToChatPage() {
      navigate('/friendNChat');
    }

    return (
      <div>
        <h1>Welcome to the Nutrifuel!</h1>
        <div><button onClick={goToExercisePage}>Exercise</button></div>
        <div><button onClick={goToNutritionPage}>Nutrition</button></div>
        <div><button onClick={goToProgressPage}>Progress</button></div>
        <div><button onClick={goToUserProfilePage}>User Profile</button></div>
        <div><button onClick={goToChatPage}>Friends/Chat</button></div>
        <div><button onClick={()=>{signOut(auth)}}>Sign out</button></div>

      </div>
    );
  }

  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard auth={auth} signOut={signOut}/>} />
          <Route path="/login" element={<Login userInfo={userInfo} auth={auth}/>} />
          <Route path="/signup" element={<Signup userInfo={userInfo} auth={auth}/> } />
          <Route path="/exerciseMain" element={<ExerciseMain />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutritionList" element={<NutritionList />} />
          {/* <Route path="/progress" element={<Progress />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileedit" element={<ProfileEdit />} />
          <Route path="/changepw" element={<Changepw />} />
          <Route path="/friendNChat" element={<FriendNChat />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
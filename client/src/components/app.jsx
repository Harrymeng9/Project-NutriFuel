import ReactDOM from 'react-dom';
import React from 'react';
import { useRef, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import ExerciseMain from './exercise/exerciseMain.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import NutritionList from './nutrition/NutritionList.jsx';
import FriendNChat from './friendlist&&chat/friend&chat.jsx';
import Profile from './profile/profile.jsx';
import ProfileEdit from './profile/profileEdit.jsx';
import Changepw from './profile/changepw.jsx';
import socket from '../helpers/socket.js';
import axios from 'axios';

import Login from './login&signup/login/Login.jsx';
import Signup from './login&signup/signup/Signup.jsx';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-config.js'

const App = () => {

  const [newMessage, setnewMessage] = useState({ content: '', from: '' })
  const [notification, setnotification] = useState(true)
  const [friendrequest, setfriendrequest] = useState('')
  const [accpetfriendrequest, setaccpetfriendrequest] = useState('')

  useEffect(() => {
    socket.auth = { username: 'jack' }
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      socket.auth = { sessionID }
    }
    socket.connect()
    socket.on("session", ({ sessionID, userID }) => {
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID;
    });
    socket.on("private message", ({ content, from }) => {
      console.log('ololo',content,from)
      setnewMessage({
        content: content,
        from: from
      })
    });
    socket.on('addfriend', ({ from }) => {
      setfriendrequest(from)
    })
  })
  const resetNewMessage = () => {
    setnewMessage({ content: '', from: '' })
  }
  const turnoffnotification = () => {
    setnotification(false)
  }
  const deny = () => {

    setfriendrequest('')
  }
  const accept = () => {
    socket.emit('makefriend', {
      from: 'jack',
      to: 'tom'
    })
    setfriendrequest('')

  }

  const navigate = useNavigate();

  const userInfo = useRef({
    uid: null,
    email: null,
    username: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log(user);
      if (user) {
        user.getIdToken()
          .then((token) => {
            console.log(token);
          });
      } else {
        navigate('/login');
      }
    })
  }, []);



  function Dashboard({ auth, signOut }) {

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
        <div><button onClick={() => { signOut(auth) }}>Sign out</button></div>
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
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile userInfo={userInfo} auth={auth}/>} />
          <Route path="/profileedit" element={<ProfileEdit />} />
          <Route path="/changepw" element={<Changepw />} />
          <Route path="/friendNChat" element={<FriendNChat newMessage={newMessage} resetNewMessage={resetNewMessage}
            turnoffnotification={turnoffnotification} accpetfriendrequest={accpetfriendrequest}
          />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
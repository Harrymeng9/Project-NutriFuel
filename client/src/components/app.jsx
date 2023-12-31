import ReactDOM from 'react-dom';
import React from 'react';
import { useRef, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import ExerciseMain from './exercise/exerciseMain.jsx';
import AddExercise from './exercise/addExercise.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import NutritionList from './nutrition/NutritionList.jsx';
import Progress from './progress/Progress.jsx';
import FriendNChat from './friendlist&&chat/friend&chat.jsx';
import Profile from './profile/profile.jsx';
import ProfileEdit from './profile/profileEdit.jsx';
import Navigation from './navigation/navigation.jsx';
import { Box, Button } from '@mui/material';

import socket from '../helpers/socket.js';
import axios from 'axios';

import Login from './login&signup/Login.jsx';
import Signup from './login&signup/Signup.jsx';
import ForgotPassword from './login&signup/ForgotPassword.jsx'

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-config.js'
import StyleSample from './stylesample/stylesample.jsx';

const App = () => {
  const navigate = useNavigate();

  const userInfo = useRef({
    uid: null,
    email: null,
    username: null,
  });

  useEffect(() => {

    onAuthStateChanged(auth, user => {
      console.log('user', user);
      if (user) {
        if (!user.isAnonymous) {
          userInfo.current.email = user.email;
          userInfo.current.uid = user.uid;
        }
        // user.getIdToken()
        //   .then((token) => {
        //     console.log(token);
        //   });
      } else {
        navigate('/login');
      }
    })
  }, []);

  const [newMessage, setnewMessage] = useState({ content: '', from: '' })
  const [notification, setnotification] = useState(false)
  const [friendrequest, setfriendrequest] = useState('')
  const [accpetfriendrequest, setaccpetfriendrequest] = useState('')
  const [message, setmessage] = useState(true)
  const [mainpage, setmainpage] = useState(true)

  useEffect(() => {
    console.log('????aaaaa', userInfo)
    setmainpage(true)
    socket.auth = { username: userInfo.current.username }
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
    if (message) {
      socket.on("private message", ({ content, from }) => {
        console.log('message')
        setnotification(true)
        setnewMessage({
          content: content,
          from: from
        })
      });
    }
    socket.on('addfriend', ({ from }) => {
      setfriendrequest(from)
    })
  })
  const resetNewMessage = () => {
    setnewMessage({ content: '', from: '' })
  }
  const turnoffnotification = (n) => {
    setnotification(n)
  }

  const backtomain = (a) => {
    navigate(a)
  }
  const deny = () => {
    setfriendrequest('')
  }
  const otherpage = (a) => {
    setmainpage(a)
  }
  const accept = (friend) => {
    socket.emit('makefriend', {
      from: 'jack',
      to: 'tom'
    })
    setfriendrequest('')
  }

  function Dashboard({ auth, signOut, userInfo }) {


    console.log('current user', auth.currentUser);

    return (
      <div>
        <h1>Welcome to the Nutrifuel!</h1>
        {!userInfo.current.uid && <button onClick={(e) => navigate('/login')}>Sign In</button>}
        {/* <div><button onClick={() => { userInfo.current = { uid: null, email: null }; signOut(auth) }}>Sign out</button></div> */}
        <Navigation userInfo={userInfo} auth={auth} notification={notification} mainpage={mainpage} />
      </div>
    );
  }

  return (
    <div>

      <div>
        <Routes>
          <Route path="/" element={<Dashboard auth={auth} signOut={signOut} userInfo={userInfo} />} />
          <Route path="/login" element={<Login userInfo={userInfo} auth={auth} />} />
          <Route path="/forgotpassword" element={<ForgotPassword auth={auth} />} />
          <Route path="/signup" element={<Signup userInfo={userInfo} auth={auth} />} />
          <Route path="/exerciseMain" element={<ExerciseMain userInfo={userInfo} auth={auth} />} />
          <Route path="/addExercise" element={<AddExercise userInfo={userInfo} auth={auth} />} />
          <Route path="/nutrition" element={<Nutrition userInfo={userInfo} auth={auth} />} />
          <Route path="/nutritionList" element={<NutritionList userInfo={userInfo} auth={auth} />} />
          <Route path="/progress" element={<Progress userInfo={userInfo} auth={auth} />} />
          <Route path="/profile" element={<Profile userInfo={userInfo} auth={auth} />} />
          <Route path="/profileedit" element={<ProfileEdit userInfo={userInfo} auth={auth} />} />
          <Route path="/friendNChat" element={<FriendNChat newMessage={newMessage} resetNewMessage={resetNewMessage}
            turnoffnotification={turnoffnotification} accpetfriendrequest={accpetfriendrequest} userInfo={userInfo}
            backtomain={backtomain} otherpage={otherpage} auth={auth}
          />} />
        </Routes>

        <Box sx={{ color: 'green', marginTop: 85 }}>{friendrequest !== '' ? <Box>new friend request from:{friendrequest}
          <Button sx={{ marginLeft: 3 }} variant="outlined" onClick={accept}>accept</Button>
          <Button variant="outlined" onClick={deny}>deny</Button>
        </Box> : null
        }</Box>
      </div>
      {/* <StyleSample /> */}
    </div>
  );
}
//newMessage.content === '' ? null :

export default App;

// color
// 157F1F green
// 4CB963 light green
// A0EADE light blue
// 5C6784 blue
// 1D263B dark blue

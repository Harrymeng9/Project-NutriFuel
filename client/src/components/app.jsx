import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';
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

const App = () => {
  const [newMessage, setnewMessage] = useState({ content: '', from: '' })
  const [notification, setnotification] = useState(true)

  useEffect(() => {
    socket.auth = { username: 'tom' }
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
      setnewMessage({
        content: content,
        from: from
      })
    });
  })
  const resetNewMessage = () => {
    setnewMessage({ content: '', from: '' })
  }
  const turnoffnotification = () => {
    setnotification(false)
  }
  function Dashboard() {
    const navigate = useNavigate();

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
      </div>
    );
  }

  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exerciseMain" element={<ExerciseMain />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutritionList" element={<NutritionList />} />
          {/* <Route path="/progress" element={<Progress />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileedit" element={<ProfileEdit />} />
          <Route path="/changepw" element={<Changepw />} />
          <Route path="/friendNChat" element={<FriendNChat newMessage={newMessage} resetNewMessage={resetNewMessage}
            turnoffnotification={turnoffnotification}
          />} />
        </Routes>
        <div >{notification ? newMessage.content === '' ? null : <div >new message</div> : null
        }</div>
      </div>
    </div>
  );
}

export default App;
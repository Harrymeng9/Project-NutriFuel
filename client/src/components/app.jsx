import ReactDOM from 'react-dom';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import ExerciseMain from './exercise/exerciseMain.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import FriendNChat from './friendlist&&chat/friend&chat.jsx';
import Profile from './profile/profile.jsx';

const App = () => {

  return (
    <div>
      <h1>This is my React app!</h1>
      {/* <ExerciseMain /> */}
      <Nutrition />
      <div>**********************************************</div>
      <FriendNChat />

      <Profile />

      <div>
        <Link to="/profile">Profile
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

    </div>


  )
}

export default App;
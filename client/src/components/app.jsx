import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import ExerciseMain from './exercise/exerciseMain.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import FriendNChat from './friendlist&&chat/friend&chat.jsx';
import Profile from './profile/profile.jsx';
import ProfileEdit from './profile/profileEdit.jsx';

const App = () => {

  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    setPath(window.location.pathname)
  }, []);


  return (
    <div>
      <h1>This is my React app!</h1>
      {/* <ExerciseMain /> */}
      {/* <Nutrition /> */}
      <div>**********************************************</div>
      {/* <FriendNChat /> */}

      <Profile />

      {/* <div>{path}</div> */}
      <div>
        <div className='ProfileIcon' onClick={() => { setPath(window.location.pathname) }}>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} size="2x"/>
            <div>Profile</div>
          </Link>
        </div>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/profileedit"
            element={<ProfileEdit />} />
        </Routes>
      </div>

    </div>


  )
}


export default App;
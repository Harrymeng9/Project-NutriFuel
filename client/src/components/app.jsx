import ReactDOM from 'react-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import ExerciseMain from './exercise/exerciseMain.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import NutritionList from './nutrition/NutritionList.jsx';
import FriendNChat from './friendlist&&chat/friend&chat.jsx';
import Profile from './profile/profile.jsx';

const App = () => {

  function Dashboard() {
    const navigate = useNavigate();

    function goToExercisePage() {
      navigate('/exerciseMain');
    }
    function goToNutritionPage() {
      navigate('/nutrition');
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/friendNChat" element={<FriendNChat />} />
        </Routes>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>This is my React app!</h1>
  //     {/* <ExerciseMain /> */}
  //     <Nutrition />
  //     <div>**********************************************</div>
  //     {/* <FriendNChat /> */}
  //     <Profile />

  //     <div>
  //       <Link to="/profile">Profile
  //         <FontAwesomeIcon icon={faUser} />
  //       </Link>
  //       <Routes>
  //         <Route path="/profile" element={<Profile />} />
  //       </Routes>
  //     </div>
  //   </div>
  // )
}

export default App;
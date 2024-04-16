import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; // Import UserContext

export default function ReviewForm() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const moveTo1 = () => {
    navigate('/Chatx');
  };

  return (
    <div className="chat_container">
      {user && (
  <>
    <h2>Welcome To REWIEW Help us make this better {user.name}</h2>
    {user.email}
    <h3>RANK: {user.roll}</h3>
    <h2>Welcome To REWIEW Help us make this better {user.name}</h2>
      <div className="nav_container">
        <ul>
          <li>
            <button onClick={moveTo1}> back to CHAT</button>
          </li>
        </ul>
      </div>
  </>
)}
      
    </div>
  );
}
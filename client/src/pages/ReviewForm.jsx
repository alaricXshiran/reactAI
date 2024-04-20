import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function ReviewForm() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const moveTo1 = () => {
    navigate('/Chatx');
  };

  return (
    <div className="chat_container">
      {user && (
        <div>
          <h2>Welcome To REWIEW Help us make this better {user.name}</h2>
          <h3>Email: {user.email}</h3>
          <h4>RANK: {user.roll}</h4>
          <div className="nav_container">
            <ul>
              <li>
                <button onClick={moveTo1}>Back to CHAT</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
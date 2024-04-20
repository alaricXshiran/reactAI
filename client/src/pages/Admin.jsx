import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const moveTo1 = () => {
    navigate('/Userdelx');
  };

  const moveTo2 = () => {
    navigate('/Doxman');
  };

  return (
    <div className="chat_container">
      <h1>Admin</h1>
      {user.roll=="admin" && (
        <div>
          <h2>Welcome {user.name}</h2>
          <h3>Email: {user.email}</h3>
          <h4>RANK: {user.roll}</h4>
          <div className="nav_container">
            <ul>
              <li>
                <button onClick={moveTo1}>Manage USERS</button>
              </li>
              <li>
                <button onClick={moveTo2}>Manage Documents</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
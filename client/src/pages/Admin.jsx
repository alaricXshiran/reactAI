import React, { useContext, useEffect, useState } from 'react';
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
      <h2>Welcome {user.name}</h2>
      {user.email}
      <h3>RANK: {user.roll}</h3>
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
  );
}
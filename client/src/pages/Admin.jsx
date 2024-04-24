import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import './css/Admin.css'


export default function Admin() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.roll && user.roll.toLowerCase().includes('admin')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
  
    }
  }, [user]);

  const moveTo1 = () => {
    navigate('/Userdelx');
  };

  const moveTo2 = () => {
    navigate('/Doxman');
  };

  return (
    <div className='chat_container'>
      {isAdmin ? (
        <>
          <h1>Admin</h1>
          {user && (
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
        </>
      ) : (
        <h1>Unauthorized Access</h1>
      )}
    </div>
  );
}
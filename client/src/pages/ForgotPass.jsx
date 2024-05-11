import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';



export default function ForgotPass() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  
  return (
    <div className="login-form">
      
      <div className="main">
       
        
            <h1>Admin</h1>
            {user && (
              <div className="container">
                <h2>Welcome {user.name}</h2>
                <h3>Email: {user.email}</h3>
                <h4>RANK: {user.roll}</h4>
               
              </div>
            )}
      </div>
    </div>
  );
}
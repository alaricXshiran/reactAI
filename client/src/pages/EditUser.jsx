import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    number: ''
  });

  const handleSignOut = () => {
    Cookies.remove('token');
    localStorage.removeItem("token");
    navigate('/Login')
    window.location.reload();
  }

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        number: user.number || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:8000/up/${user._id}`, formData);
      handleSignOut();
      

    } catch (error) {
      console.error('Error updating user:', error);
   
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="users_container">
      <h1>Welcome {user.firstName} to Update Accounts</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Account ID:
          <input type="text" value={user._id} name="_id" disabled />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} disabled />
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <label>
          Number:
          <input type="text" name="number" value={formData.number} onChange={handleChange} />
        </label>
        <p>WARNING: You will Be logged  out of your account and will have to login again to see the changed results</p>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
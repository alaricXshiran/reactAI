import React, { useContext, useState } from 'react';

import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import './css/Login.css'
import Cookies from 'js-cookie';

import { UserContext } from '../../context/userContext';






export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext);

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()

    Cookies.remove('token')
    localStorage.removeItem('token')

   
  

    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      });
      if(data.error) {
        toast.error(data.error)
        Cookies.remove('token')
        localStorage.removeItem('token')
        navigate('/Register')
      } else {
        setData({});
        axios.get('/profile')
        .then(({ data }) => {
          setUser(data);
          console.log(data)

          if(data.roll=="admin"){
            navigate('/Admin')
          }else{
            navigate('/Chatx')
          }
        })
        .catch(error => {
          console.error('Error refreshing user data:');
          Cookies.remove('token')
          localStorage.removeItem('token')
        })
        localStorage.setItem('token',data.password)//create the token on local storage
        
        
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
   

    <div className="login-form">
    <div className="container">
      <h1>Login Account</h1>
      <div className="main">
        <div className="content">
        <form onSubmit={loginUser}>
      <label>Email</label>
      <input type='text' placeholder='Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
      <label>Password</label>
      <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
      
      <button type='submit'>LOGIN</button>
    </form>
        </div>
      </div>
    </div>
  </div>

  
  )
}

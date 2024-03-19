import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'

export default function Login() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()

    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      });
      if(data.error) {
        toast.error(data.error)
        navigate('/Register')
      } else {
        setData({});
        localStorage.setItem('token',data.password)//create the token on local storage
        navigate('/Chatx')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
   

    <div class="login-form">
    <div class="container">
      <h1>Register Account</h1>
      <div class="main">
        <div class="content">
        <form onSubmit={loginUser}>
      <label>Email</label>
      <input type='text' placeholder='Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
      <label>Password</label>
      <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
      <label> Reminder add hidden input to stop bots</label>
      <button type='submit'>LOGIN</button>
    </form>
        </div>
      </div>
    </div>
  </div>

  
  )
}

import React from 'react'
import { useState } from 'react'
import './css/Register.css'
import axios from 'axios'
import {toast}from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate=useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })



  const registerUser = async(e) => {
    e.preventDefault()
    const {name,email,password}=data
    try{
      const {data}=await axios.post('/register',{
        name,email,password
      })
      if(data.error){
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success('Login Sucessfull. Welcome!')
        navigate('/Login')
      }
    }catch{
      console.log(error)
    }
  }

  return (
    <div className="login-form">
      <div className="container">
        <h1>Register Account</h1>
        <div className="main">
          <div className="content">
            <form onSubmit={registerUser}>
              <label>Name</label>
              <input type='text' placeholder='Enter name...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
              <label>Email</label>
              <input type='text' placeholder='Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
              <label>Password</label>
              <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
              <button type='submit'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

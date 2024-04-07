import React from 'react'
import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
export default function Userdelx() {
  const {user}=useContext(UserContext)
  const navigate = useNavigate()
  const moveTo = () => {
    navigate('/Admin')
  }
  return (
   
    <div className="chat_container">
        <button onClick={moveTo}>Back To Admin</button>
      <h1>Manage Users</h1>
      <h2>Welcome Admin {user.name}</h2>
    </div>

  )
}
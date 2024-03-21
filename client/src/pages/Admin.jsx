import React from 'react'
import {useContext} from 'react'
import { UserContext } from '../../context/userContext'

import './css/Admin.css'
export default function Admin() {
  const {user}=useContext(UserContext)
  
  return (
   
    <div className="chat_container">
      <h1>Admin</h1>
      <h2>Welcome to the ADMIN {user.name}</h2>
      {user.email}
      <h3>What is ur roll: {user.roll}</h3>
    </div>

  )
}
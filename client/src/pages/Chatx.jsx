import {useContext} from 'react'
import { UserContext } from '../../context/userContext'

import './css/Chatx.css'
export default function Chatx() {
  const {user}=useContext(UserContext)
  return (
    <div>
    <div className='chat_container'>
      <h1>Chat-Bot</h1>
      <h2>Welcome to the chat {user.name}</h2>
      <h3>Email: {user.email}</h3>
    </div>
    </div>
  )
}

import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import './css/Chatx.css'
export default function Chatx() {
  const {user}=useContext(UserContext)
  return (
    <div className='chat_container'>
      <h1>Chat-Bot</h1>
      {!!user &&(<h2>Welcome to chat the {user.name}</h2>)}
      <h3>Email: {user.email}</h3>
    </div>
  )
}

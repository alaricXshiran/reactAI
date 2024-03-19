import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
export default function chatx() {
  const {user}=useContext(UserContext)
  return (
    <div>
      <h1>Chat</h1>
      <h2>Welcome to chat with Law {user.name}</h2>
      <h3>Email: {user.email}</h3>
    </div>
  )
}

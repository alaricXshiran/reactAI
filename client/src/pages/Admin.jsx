import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
export default function Adminx() {
  const {user}=useContext(UserContext)
  return (
    <div>
      <h1>Admin</h1>
     
    </div>
  )
}
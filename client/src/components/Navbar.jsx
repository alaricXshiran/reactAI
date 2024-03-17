import { Link } from 'react-router-dom'
import '../components/Navbar.css'

export default function Navbar() {
  return (

    
    <nav>
       <table class="dashboard">
    <tr>
      <th colspan="4">LAW Chat</th>
    </tr>
    <tr>
      <td><a href="/Home"><Link to='/Home'>Home</Link></a></td>
      
      <td><a href="/Register"><Link to='/Register'>Register</Link></a></td>
      
      <td><a href="/Login"><Link to='/Login'>Login</Link></a></td>
      
      <td><a href="/Chat"><Link to='/Chatx'>Chat</Link></a></td>
      
    </tr>
  </table>
      
      
      
      
    </nav>


  )
}

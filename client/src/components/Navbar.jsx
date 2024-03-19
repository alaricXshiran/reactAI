import { Link, useNavigate } from 'react-router-dom'
import '../components/Navbar.css'

import logo_law from '../assets/imgs/law.png'

export default function Navbar() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <nav className='navigation-bar'>
      <Link to='/Home'><img src={logo_law} alt="" className='logo' /></Link>
      <ul>
        <li><Link to='/Home'>What's New?</Link></li>
        <li><Link to='/Register'>Register</Link></li>

        <li> <Link to='/Login'>Login</Link></li>
        {isUserSignedIn ? (
          <>
            <Link to='/Chatx'><li>Chat</li></Link>
            <li><button onClick={handleSignOut}>LogOut</button></li>
          </>
        ) : (
          <>
            <li> <Link to='/Aboutx'>About Us</Link></li>
          </>
        )}


      </ul>
    </nav>
  )
}


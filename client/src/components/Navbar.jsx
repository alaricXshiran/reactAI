import { Link, useNavigate } from 'react-router-dom'
import '../components/Navbar.css'

import logo_law from '../assets/imgs/law.png'
import facebook from '../assets/imgs/facebook.png'
import xx from '../assets/imgs/xx.png'
import youtube from '../assets/imgs/youtube.png'
import instagram from '../assets/imgs/instagram.png'

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

        
        <li> <Link to='/Aboutx'>About Us</Link></li>
            <li><a href="https://www.facebook.com/YourPage" target="_blank"><img src={facebook} alt="" className='logox' /></a></li>
            <li><a href="https://twitter.com/YourUsername" target="_blank"><img src={xx} alt="" className='logox' /></a></li>
            <li><a href="https://www.instagram.com/YourUsername" target="_blank"><img src={instagram} alt="" className='logox' /></a></li>
            <li><a href="https://www.youtube.com/YourUsername" target="_blank"><img src={youtube} alt="" className='logox' /></a></li>
        {isUserSignedIn ? (
          <>
            <li><Link to='/Chatx'>Chat</Link></li>
            <li><button onClick={handleSignOut}>LogOut</button></li>
          </>
        ) : (
          <>
            <li> <Link to='/Login'>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}


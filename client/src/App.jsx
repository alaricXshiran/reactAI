
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Chatx from './pages/Chatx'
import Aboutx from './pages/Aboutx'
import Admin from './pages/Admin'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {
  
  
const isUserSignedIn=!!localStorage.getItem('token')

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Aboutx' element={<Aboutx />} />
        <Route path='/Aboutx' element={<Admin />} />
        
        {isUserSignedIn && <Route path='/Chatx' element={<Chatx />} />}
      </Routes>
    </UserContextProvider>

  )
}

export default App

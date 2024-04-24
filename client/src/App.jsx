
import './App.css'
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Chatx from './pages/Chatx'
import Aboutx from './pages/Aboutx'
import Admin from './pages/Admin'
import Userdelx from './pages/Userdelx'
import Doxman from './pages/Doxman'
import ReviewForm from './pages/ReviewForm'
import PdfPage from './pages/PdfPage';
import VerifyEmail from './pages/VerifyEmail';
import CodeResponse from './pages/CodeResponse'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {
  

  

  const user = localStorage.getItem("token");

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
      <Route path="/users/:id/verify/:token" element={<VerifyEmail/>} />
      {user && <Route path="/Chatx" exact element={<Chatx />} />}
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Aboutx' element={<Aboutx />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/CodeResponse' element={<CodeResponse />} />
        
        <Route path='/Userdelx' element={<Userdelx />} />
        <Route path='/Doxman' element={<Doxman />} />
        <Route path='/ReviewForm' element={<ReviewForm />} />
        <Route path='/PdfPage' element={<PdfPage />} />
        <Route path="/Chatx" exact element={<Chatx />}/>
      </Routes>
    </UserContextProvider>

  )
}

export default App

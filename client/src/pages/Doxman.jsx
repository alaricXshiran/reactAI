import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
export default function Doxman() {
  const { user } = useContext(UserContext)

  const [title, setTitle] = useState("")
  const [file, setFile] = useState("")
  const submitImage=async(e)=>{
   
  }

  const navigate = useNavigate()
  const moveTo = () => {
    navigate('/Admin')
  }

  return (

    <div className="chat_container">
      <button onClick={moveTo}>Back To Admin</button>
      <h1>Manage Documents</h1>
      <h2>Welcome Admin {user.name}</h2>
      <form className='upload_form' onSubmit={submitImage}>
        <h4>Upload Only In PDF's</h4>
        <input
          type='text'
          className='upload_title'
          placeholder='Title'
          required
          onChange={(e)=>setTitle(e.target.value)}
        />
        <input
          type='file'
          className='upload_file'
          accept='application/pdf'
          onChange={(e)=>setFile(e.target.files[0])}
        />
        <button type='submit'>Submit</button>

      </form>




    </div>

  )
}
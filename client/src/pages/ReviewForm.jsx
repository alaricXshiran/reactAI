import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

export default function ReviewForm() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const moveTo1 = () => {
    navigate('/Chatx');
  };

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/send-email', {
        email:"lawproject.srilanka@gmail.com",
        subject:"Review comment",
        text: message
      }); 
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error sending email:', error);
      setResponse('An error occurred while sending the email.');
    }
  };


  return (
    <div className="chat_container">
      {user && (
        <div>
          
          <h2>Welcome To REWIEW Help us make this better {user.name}</h2>
          <h3>Email: {user.email}</h3>
          <h4>RANK: {user.roll}</h4>

          <div>
      <h1>Tell Us What You Think To Improve</h1>
      <form onSubmit={handleSubmit} className='mail-form'>
        <input type="email" value={"lawproject.srilanka@gmail.com"} onChange={(e) => setEmail(e.target.value)} required hidden/>
        <input type="text" value={"Review comment"} onChange={(e) => setSubject(e.target.value)} required hidden/>
        <label>REVIEW:</label>
        <textarea value={message}  placeholder="Write Your Review here..." onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Send Review</button>
      </form>
      {response && <p>{response}</p>}
    </div>
        </div>
      )}
    </div>
  );
}
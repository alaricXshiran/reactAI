import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Userdelx.css';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send password reset link request to server using email
      // Example: const response = await resetPassword(email);
      // Handle response
      setMessage('Password reset link sent. Check your email.');
    } catch (error) {
      setMessage('Failed to send password reset link. Please try again later.');
    }
  };

  return (
    <div className="users_container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
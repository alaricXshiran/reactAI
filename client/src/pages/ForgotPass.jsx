import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function ForgotPass() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
      Cookies.remove('token');
      localStorage.removeItem("token");
      navigate('/Login')
      window.location.reload();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);



        try {
            const response = await axios.post('http://localhost:8000/forgot-password', { email });
            if (response.data.Status === 'Success') {
              handleSignOut()
            } else {
              handleSignOut()
            }
        } catch (error) {
            setError('An error occurred while processing your request. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <div>
            <div>
                <h4>Forgot Password</h4>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div>{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPass;
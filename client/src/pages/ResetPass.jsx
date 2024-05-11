import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPass() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8000/reset-password/${id}/${token}`, { password });
            if (response.data.status === "Success") {
                navigate('/login');
            } else {
                setError("Try logging in");
            }
        } catch (error) {
            setError("An error occurred while resetting the password. Please try again later.");
            console.error("Password reset error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h4>Reset Password</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password"><strong>New Password</strong></label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default ResetPass;
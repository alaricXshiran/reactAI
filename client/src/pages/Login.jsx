
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './css/Login.css';
import Cookies from 'js-cookie';
import { UserContext } from '../../context/userContext';
import eye from '../assets/imgs/eye.png'
import eye1 from '../assets/imgs/eye1.png'
const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        setError(""); // Clear error when user starts typing
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Cookies.remove('token');
            localStorage.removeItem('token');
            const url = "http://localhost:8000/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                    if(data.roll === "admin") {
                        window.location = "/Admin";
                    } else {
                        window.location = "/Chatx";
                    }
                });
            // Redirect user to dashboard or another page after successful login
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    const moveTo1 = () => {
        navigate('/ForgotPass');
      };
    return (
        <div className="login-form">
            <div className="container">
                <div className="main">
                    <form className="content" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                        />
                        
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                            />
                            
                            <span
                                className={`password-toggle ${showPassword ? "show" : ""}`}
                                onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <img src={eye} alt="" className='logoxx' /> : <img src={eye1} alt="" className='logoxx' />}
                            </span>
                            
                        {error && <div className="error">{error}</div>}
                        <button type="submit">
                            Login
                        </button>
                        <label onClick={moveTo1}>Forgot Password ?</label>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
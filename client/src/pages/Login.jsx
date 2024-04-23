
import React, { useContext, useState } from 'react';
import axios from "axios";
import './css/Login.css';
import Cookies from 'js-cookie';
import { UserContext } from '../../context/userContext';

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { user, setUser } = useContext(UserContext);
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        setError(""); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Cookies.remove('token')
          
            localStorage.removeItem('token')
           
            const url = "http://localhost:8000/api/auth";
            
            const { data: res } = await axios.post(url, data);
           
            localStorage.setItem("token", res.data);
            axios.get('/profile')
          .then(({ data }) => {
            setUser(data);
            if(data.roll=="admin"){
                window.location = "/Admin";
            }
            else{
                window.location = "/Chatx";
            }
            
            
          })
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
                            className=""
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className=""
                        />
                        {error && <div className="error">{error}</div>}
                        <button type="submit" className="">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
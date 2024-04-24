import React, { useState } from 'react';
import axios from "axios";
import './css/Register.css';
import eye from '../assets/imgs/eye.png'
import eye1 from '../assets/imgs/eye1.png'
const Register = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8000/api/users";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }; 

    return (
        <div className="login-form">
            <h1>Welcome</h1>
            <div className="container">
                <div className="main">
                    <form className="content" onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                        />
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
                        {msg && <div className="msg">{msg}</div>}
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
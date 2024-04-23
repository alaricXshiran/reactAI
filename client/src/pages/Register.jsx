import React, { useState } from 'react';
import axios from "axios";
import './css/Register.css';

const Register = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
	
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
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
        <div >
            <div className="login-form" >
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
                        className=""
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        value={data.lastName}
                        required
                        className=""
                    />
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
                    {error && <div className="">{error}</div>}
                    {msg && <div className="">{msg}</div>}
                    <button type="submit" className="">
                        Register
                    </button>
                </form>
            </div>
			</div>
			</div>
			</div>
        
    );
};

export default Register;
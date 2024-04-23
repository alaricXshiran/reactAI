import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8000/api/users/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
               
                setValidUrl(true);
            } catch (error) {
                console.log("Error response:", error.response); // Log the error response for more details
                console.log("Error message:", error.message); // Log the error message
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <>
            {validUrl ? (
                <div className="">
                    <img src='' alt="" className="" />
                    <h1>Email verified successfully</h1>
                    <Link to="/Login">
                        <button className="">Login</button>
                    </Link>
                </div>
            ) : (
                <h1>Go back and try Logging in</h1>
            )}
        </>
    );
};

export default VerifyEmail;
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UserSubscribe = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        subscribe: '',
        subscribeStartDate: '',
    });
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const handleSignOut = () => {
        Cookies.remove('token');
        localStorage.removeItem("token");
        navigate('/Login');
    };

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                number: user.number || '',
                subscribe: user.subscribe || '',
                subscribeStartDate: user.subscribeStartDate || '',
            }));
            updateCountdown(); // Initial update
            const intervalId = setInterval(updateCountdown, 1000); // Update countdown every second

            return () => {
                clearInterval(intervalId); // Cleanup interval on component unmount
            };
        }
    }, [user]);

    const updateCountdown = () => {
        // Calculate remaining time
        const start = new Date(user.subscribeStartDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 30); // 30 days from start date
        const today = new Date();
        const remainingTime = end - today; // Remaining time in milliseconds

        // Convert milliseconds to days, hours, minutes, and seconds
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // Update state with remaining time
        setCountdown({ days, hours, minutes, seconds });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Set subscribe value to "1" and update subscribeStartDate to current date
            const currentDate = new Date().toISOString(); 
            const updatedFormData = { ...formData, subscribe: "1", subscribeStartDate: currentDate };
            
            const response = await axios.patch(`http://localhost:8000/up/${user._id}`, updatedFormData);
            window.location.href = "https://sandbox.payhere.lk/pay/o850804a8";
    
            
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    if (user.subscribe === "1") {
        return (
            <div className="container">
                You have Already Subscribed   
                <p>Time Remaining: {countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes, {countdown.seconds} seconds</p>
            </div>
        );
    }

    return (
        <div className="login-form">
            <h1>Welcome {user.firstName} to Subscriptions</h1>
            <div className="container">
                <div className="main">
                    <form onSubmit={handleSubmit}>
                        Account ID:
                        <input type="text" value={user._id} name="_id" disabled />

                        Email:
                        <input type="email" name="email" value={user.email} disabled />

                        <input type="hidden" name="firstName" value={formData.firstName} />
                        <input type="hidden" name="lastName" value={formData.lastName} />
                        <input type="hidden" name="number" value={formData.number} />

                        <button type="submit">Subscribe</button>


                        <p>WARNING: You will be logged out of your account and will have to login again to see the changed results</p>
                    </form>
                </div>
            </div>
          
        </div>
    );
};



export default UserSubscribe;


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User } = require("../models/user");

const forgotPass = async (req, res) => {
    const { email } = req.body;
    
    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });

            var mailOptions = {
                from: process.env.USER,
                to: email,
                subject: 'Reset Password Link',
                text: `http://localhost:5173/reset_password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Failed to send reset password email" });
                } else {
                    return res.status(200).json({ status: "Success" });
                }
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        });
};

// Function to validate email format
function isValidEmail(email) {
    // Simple email regex, modify as needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const resetPass = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ error: "Invalid token" });
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

        await User.findByIdAndUpdate(id, { password: hashPassword });
        
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {
    forgotPass,
    resetPass,
};

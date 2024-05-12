const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getProfile, getUlists, delUser, upUser, upFile, storagex, getfiles, aiChat, sendReviewEmail } = require('../controllers/authController');
const { forgotPass, resetPass } = require('../utils/resetMail');
const { User } = require("../models/user");

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);
router.use("/uploads", express.static('uploads'));

router.post("/send-email", sendReviewEmail);

router.post("/gemini", aiChat); // gemini AI Chatx

router.get('/profile', getProfile); //get the user Profile

router.get('/ulists', getUlists); //get all the users

router.delete('/del/:id', delUser); //Delete a user

router.patch('/up/:id', upUser); //Update a user

router.post('/upload', storagex, upFile); // Upload single file

router.get('/getfiles', getfiles);

router.post("/forgot-password", forgotPass);

router.post("/reset-password/:id/:token", resetPass);

router.get('/wishcount/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the wish count for the specified user from the database
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // If the user is found, get their wish count
        const wishCount = user.wishes;

        // Send back the wish count as JSON
        res.json({ wishCount });
    } catch (error) {
        // If there's an error, send back an error response
        console.error(error);
        res.status(500).json({ error: 'Failed to get wish count' });
    }
});

router.put('/decreasewishcount/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Decrease the wish count by 1
        user.wishes -= 1;
        await user.save();

        // Send a success response
        res.json({ message: 'Wish count decreased successfully' });
    } catch (error) {
        // If there's an error, send back an error response
        console.error(error);
        res.status(500).json({ error: 'Failed to decrease wish count' });
    }
});

module.exports = router;
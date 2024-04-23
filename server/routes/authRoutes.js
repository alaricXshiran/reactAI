const express = require('express')
const router = express.Router()
const cors = require('cors')
const {  getProfile, getUlists, delUser, upUser,upFile,storagex,getfiles,aiChat } = require('../controllers/authController')



// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)
router.use("/uploads",express.static('uploads'))

router.post("/gemini",aiChat)// gemini AI Chatx

router.get('/profile', getProfile)//get the user Profile

router.get('/ulists', getUlists)//get all the users

router.delete('/del/:id', delUser)//Delete a user

router.patch('/up/:id', upUser)//Update a user

router.post('/upload', storagex,upFile); // Upload single file

router.get('/getfiles',getfiles);

module.exports = router
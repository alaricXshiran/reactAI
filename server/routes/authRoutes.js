const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, getUlists } = require('../controllers/authController')


// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)

router.post('/register', registerUser)//register Users

router.post('/login', loginUser)//login users

router.get('/profile', getProfile)//get the user Profile

router.get('/userList', getUlists)//get all the users


module.exports = router
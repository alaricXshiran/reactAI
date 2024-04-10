const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, getUlists, delUser, upUser } = require('../controllers/authController')


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

router.get('/ulists', getUlists)//get all the users

router.delete('/del/:id', delUser)//Delete a user

router.patch('/up/:id', upUser)//Update a user


module.exports = router
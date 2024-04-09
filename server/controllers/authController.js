const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');




const test = (req, res) => {
    res.json('test is working')
}
// Register page work
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check data
        if (!name) {
            return res.json({
                error: 'Please Enter a Name'
            })
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'Please Enter a Password with more than 6 characters'
            });
        };
        if (!email) {
            return res.json({
                error: 'Please Enter the Email'
            });
        };
        //check if email exist
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password)

        //create User account in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            roll: "user"
        });

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

//login page work
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'User Not Found please Register'
            })
        }

        //check if Password and hashedpassword in DB
        const match = await comparePassword(password, user.password)
        try {
            if (match) {
                jwt.sign({ email: user.email, name: user.name, roll: user.roll }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.cookie('token', token).json(user)
                })
            }
            else{
                return res.json({
                    error: 'Check your Password, Are you sure you have an Account'
                });
            }
        } catch (error) {
            return res.json({
                error: 'Password error'
            });
        }
    } catch (error) {
        console.log(error)
    }
}

//profile
const getProfile = (req, res) => {
    try {
        const { token } = req.cookies
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) {
                    throw err;
                }
                res.json(user)
            })
        }

    } catch (error) {
        return res.json({
            error: 'Profile error'
        });
    }

}

//create user lists
const getUlists=async(req,res)=>{
    const users=await User.find({}).sort({createdAt:-1})
    res.status(200).json(users)

}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    getUlists,

}
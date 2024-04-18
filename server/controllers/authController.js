const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');


require('../models/pdfDetails');
const pdfSchema = mongoose.model("PdfDetails")



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
            else {
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
const getUlists = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

//delete a user
const delUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid User ID' });
    }

    try {
        const deletedUser = await User.findOneAndDelete({ _id: id });

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

//update a user
const upUser = async (req, res) => {
    const { id } = req.params

    if (!Mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not Exist' })
    }
    const updatedUser = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!updatedUser) {
        return res.status(400).json({ error: 'No such Users' })
    }

    res.status(200).json(updatedUser)
}

//upload file
// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix+file.originalname);
    }
});

const upload = multer({ storage });

// Middleware for handling file upload
const storagex = upload.single('file');

// Controller function to handle file upload
const upFile = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const uploadedFile = req.file;
    const filename = req.body.filename; // title of the file
    const newFilename = uploadedFile.filename; // original file name
  
    try {
      // Save the file details to the database
      await pdfSchema.create({ title: filename, pdf: newFilename });
      // Send a success response to the client
      res.status(200).json({ message: 'File uploaded successfully', file: uploadedFile });
    } catch (error) {
      // Handle any errors that occur during file upload or database operation
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

//get files

const getfiles=async(req,res)=>{
try {
    pdfSchema.find({}).then(data=>{
        res.json({status:200 ,data:data})
    })
} catch (error) {
    console.log(error)
}
}


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    getUlists,
    delUser,
    upUser,
    upFile,
    storagex,
    getfiles,
}

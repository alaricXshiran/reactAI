const express = require('express');

const multer = require('multer');
const mongoose = require('mongoose');
const { User } = require("../models/user");

const jwt = require('jsonwebtoken');

const sendReview = require("../utils/sendReview");
require('../models/pdfDetails');
const pdfSchema = mongoose.model("PdfDetails")



// gemini AI part
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

const aiChat = async (req, res) => {
        const { history, message } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
 
 
  const chat = model.startChat({
    history: req.body.history,
  });
  const msg = req.body.message;

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text =  response.text();
  res.send(text);
};


//send Review Email
const sendReviewEmail = async (req, res) => {
    const { email, subject, text } = req.body;
    try {
        const result = await sendReview(email, subject, text);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error("Error sending review email:", error);
        res.status(500).json({ error: "An error occurred while sending the review email." });
    }
};


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
    const userId = req.params.id;
    const { firstName, lastName, number } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user properties if they are provided in the request body
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (number) user.number = number;
  
      await user.save();
  
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

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

    getProfile,
    getUlists,
    delUser,
    upUser,
    upFile,
    storagex,
    getfiles,
    aiChat,
    sendReviewEmail,
}

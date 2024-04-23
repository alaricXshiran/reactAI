const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const cors = require("cors");

// Set up CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true // Allow credentials
};


router.use(cors(corsOptions));

router.post("/", async (req, res) => {// Registering Account and await verification
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res  
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/verify/:token/", async (req, res) => {// verify link confermation
  try {
    // Find the user based on the ID parameter
    const user = await User.findOne({ _id: req.params.id });
    
    // If no user is found, return a 400 status with an error message
    if (!user) {
      console.log("User not found");
      return res.status(400).send({ message: "Invalid link" });
    }

    // Find the token associated with the user
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

 

    // If no token is found, return a 400 status with an error message
    if (!token) {
      console.log("Token not found");
      return res.status(400).send({ message: "Invalid link" });
    }

    // Update the user's 'verified' field to true
    await User.updateOne({ _id: user._id }, { verified: true });

    // Attempt to remove the token from the database using deleteOne()
    await Token.deleteOne({ _id: token._id });

    // Send a 200 status with a success message
    console.log("Email verified successfully");
    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    // If an error occurs, log the error and send a 500 status with an error message
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
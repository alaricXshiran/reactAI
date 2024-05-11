const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const cron = require("node-cron");
const passwordComplexity = require("joi-password-complexity");

//Register
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, default: "0760000000" },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    roll: { type: String, default: "user" },
    subscribe: { type: String, default: "0" },
    subscribeStartDate: { type: Date, default: Date.now },
    wishes: { type: Number, default: 3 },
});



userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      roll: this.roll,
      number: this.number,
	  subscribe:this.subscribe,
	  subscribeStartDate:this.subscribeStartDate,
	  wishes:this.wishes,
    subscribeStartDate:this.subscribeStartDate,
    password:this.password,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};


// Mongoose method to refresh wish count and check subscription expiration
userSchema.statics.refreshWishCountAndCheckSubscription = async function () {
  try {
      const users = await this.find(); // Find all users
      const currentDate = new Date(); // Current date
      for (const user of users) {
          // Update wish count based on subscribe field
          user.wishes = user.subscribe === "1" ? 10 : 3;

          // Check subscription expiration
          if (user.subscribeStartDate) {
              const thirtyDaysAgo = new Date(user.subscribeStartDate);
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() + 30);
              if (currentDate > thirtyDaysAgo) {
                  user.subscribe = "0"; // Subscription expired
                  user.wishes = 3; // Reset wish count to 3
              }
          }

          await user.save(); // Save updated user
      }
      console.log("Wish count refreshed and subscription checked successfully");
  } catch (error) {
      console.error("Error refreshing wish count and checking subscription:", error);
  }
};


const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password:/*passwordComplexity().*/ Joi.string().required().label("Password"),
	//can make the user create a complex  password just remove Joi.string(). and call passwordComplexity().
});
  return schema.validate(data);
};


// Schedule job to refresh wish count and check subscription every hour
cron.schedule("0 * * * *", async () => {
	await User.refreshWishCountAndCheckSubscription();
  });

module.exports = { User, validate };

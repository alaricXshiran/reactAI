const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");


const userSchema = new mongoose.Schema({
	firstName:{ type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	number: { type: String, default:"0000000" },
	password: { type: String, required: true },
	verified: { type: Boolean, default: false },
    roll:{ type: String, default:"user"}
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id:this._id,email: this.email, firstName: this.firstName,lastName:this.lastName, roll: this.roll,number:this.number }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	 
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password:Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate }; 
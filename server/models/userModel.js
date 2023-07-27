const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {

    if(!email || !password){
        throw Error("All field must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// Login user

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All field must be filled")
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error("Incorrect Email")
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword){
        throw Error("incorrect password")
    }

    return user
}

const model = mongoose.model("user", userSchema);

module.exports = model;

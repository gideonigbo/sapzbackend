const mongoose = require('mongoose')


//Setting up the user schema
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {
    type: Boolean,
    default: false
  },
  profile: {
    country: String,
    street: String,
    Bio: String
  },
  otp: String,
  otpIsvalid: Date,
  lastOtpSent: Date,
  passwordResetToken: String,
  passwordResetIsValid: Date,
  lastpasswordResetTokenSent: Date,
  passwordTokenverified: {type: Boolean, default: false},
  verified: {type: Boolean, default: false}
}, {timestamp: true})

const User = mongoose.model('user', userSchema)

module.exports = User

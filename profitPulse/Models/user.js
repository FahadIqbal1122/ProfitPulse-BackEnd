const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  passwordDigest: {
    type: string,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)

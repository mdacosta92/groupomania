const { number } = require('joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const newUser = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  isAdmin: {type: Number, default: 0}
});

newUser.plugin(uniqueValidator);

module.exports = mongoose.model('users', newUser);
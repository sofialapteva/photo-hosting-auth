const mongoose = require('mongoose');

const User = new mongoose.model('User', {
  login: String,
  password: String,
});

const Photo = new mongoose.model('Photo', {
  url: String,
  urlToMini: String,
  comment: String,
  userId: { type: mongoose.ObjectId, ref: 'User' },
  authorised: { type: Boolean, default: false }
});


module.exports = { User, Photo }

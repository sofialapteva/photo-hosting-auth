const express = require('express');
const router = express.Router();
const sha = require('sha256')
const { User } = require('../models/models')

router.route('/login').get((req, res) => {
  res.render('login');
}).post(async (req, res) => {
  let newUser = await User.findOne({ login: req.body.login, password: sha(req.body.password) });
  if (newUser) {
    req.session.login = newUser.login
    req.session.userId = newUser._id
    res.redirect('/')
  } else {
    res.redirect('/user/register')
  }
})

router.route('/register').get((req, res) => {
  res.render('register');
}).post(async (req, res) => {
  let newUser = new User({
    login: req.body.login,
    password: sha(req.body.password)
  })
  await newUser.save()
  req.session.login = newUser.login;
  req.session.userId = newUser._id;
  res.redirect('/')
})


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;

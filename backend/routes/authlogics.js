const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({mssg:'login user'})
};

const signupuser = async (req, res) => {
  const { email, password, Name } = req.body;
  try {
    const user = await User.signup(email, password, Name);
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({mssg:'signup user'})
};

const googlesignupuser = async (req, res) => {
  const { email,Name } = req.body;
  try {
    const user = await User.googlesignup(email,Name);
    const token = createToken(user._id);
    res.status(200).json({ user, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({mssg:'signup user'})
};

const googleloginuser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.googlelogin(email);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({mssg:'login user'})
};

const router = express.Router();
router.post("/login", loginuser);

router.post("/signup", signupuser);

router.post("/googlesignup", googlesignupuser);

router.post("/googlelogin", googleloginuser);

module.exports = router;

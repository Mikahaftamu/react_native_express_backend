const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
})

// Register a new user
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  console.log(req.body)
  try {
    const user = new User({ firstName, lastName, username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Forgot Password (Mock implementation)
router.post('/forgot-password', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // In a real app, send a password reset email here
    res.json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {

    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
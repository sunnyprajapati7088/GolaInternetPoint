const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register
// Expects: { name, email, mobileNo, password, role, app_id, studentProfile?, employeeProfile? }
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobileNo, password, role = 'student', app_id, studentProfile, employeeProfile } = req.body;

    if (!name || !email || !mobileNo || !password || !app_id) {
      return res.status(400).json({ message: 'Missing required fields: name, email, mobileNo, password, app_id' });
    }

    // Check for existing email or mobile
    const exists = await User.findOne({ $or: [{ email }, { mobileNo }] }).lean();
    if (exists) {
      return res.status(409).json({ message: 'Email or mobile number already registered' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Generate a simple registrationId (you can replace with your own generator)
    const registrationId = `REG-${Date.now()}`;

    const userData = {
      registrationId,
      app_id,
      name,
      email,
      mobileNo,
      password: hashed,
      role,
    };

    // Attach profile based on role
    if (role === 'student') userData.studentProfile = studentProfile;
    if (role === 'employee') userData.employeeProfile = employeeProfile;

    const user = new User(userData);
    await user.save();

    // Return created summary (do not return password)
    return res.status(201).json({
      id: user._id,
      registrationId: user.registrationId,
      name: user.name,
      email: user.email,
      mobileNo: user.mobileNo,
      role: user.role,
      createdAt: user.createdAt
    });

  } catch (err) {
    console.error('Register error', err);
    // Handle mongoose duplicate key error
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate field value', details: err.keyValue });
    }
    // Validation errors
    if (err && err.message) return res.status(400).json({ message: err.message });

    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

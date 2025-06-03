require('dotenv').config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const JWT_SECRET =  process.env.JWT_SECRET;

// Create a new user
exports.createUser = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ success: true, message: "User created successfully", authToken });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Authenticate a user
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const payload = { user: { id: user.id } };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, message: "Login successful", authToken });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

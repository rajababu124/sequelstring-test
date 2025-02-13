const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    
    const { name, email, password, role,  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({ name, email, password: hashedPassword, role});
    await user.save();


    res.status(201).json({ message : "Registeration successfull !!"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
// jwt-secret key is not working properly 
    const token = jwt.sign({ id: user._id }, 'JWT_SECRET', { expiresIn: "1d" });
    res.json({ token , user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;







// Build application with frontend and backend where you register a user and assign roles and permission to the user and based on roles display different view
// Roles and Permission should be a Middleware in backend
// Backend should be service driven architecture and preferably a microservice approach.
// 2 roles and permission based role.
// i. Role A uploads a document
// ii. Role B approves the uploaded document after viewing
// Time Frame: Max 1hr 30 min.
// Tech Stack: MERN – Typescript/ Javascript
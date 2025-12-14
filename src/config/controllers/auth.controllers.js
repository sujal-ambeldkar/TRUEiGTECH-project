const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    console.log("Request body:", req.body); // check body

    const { name, email, password, role } = req.body;
    console.log("Destructured values:", { name, email, password, role });

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    // Check if User model is working
    console.log("Checking if User model works...");
    const existingUser = await User.findOne({ email });
    console.log("Existing user found:", existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const user = new User({ name, email, password: hashedPassword, role: role || "user" });
    await user.save();
    console.log("User saved:", user);

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log("JWT created");

    res.status(201).json({ token, user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login body:", req.body);

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Please provide email and password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // important

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected "))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
const planRoutes = require("./src/config/routes/plan.routs");
app.use("/plans", planRoutes);

const authRoutes = require("./src/config/routes/auth");
app.use("/auth", authRoutes);
const subscriptionRoutes = require("./src/config/routes/subscription");
app.use("/subscriptions", subscriptionRoutes);

// Test route
app.get("/", (req, res) => res.send("Fit Plan Hub API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
const protectedRoutes = require("./src/config/routes/protected");
app.use("/api", protectedRoutes);

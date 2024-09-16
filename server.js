const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const assessmentRoutes = require("./routes/assessment");

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json()); // Parse JSON data

// Route middleware
app.use("/auth", authRoutes);
app.use("/assessment", assessmentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

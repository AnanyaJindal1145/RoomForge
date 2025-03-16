require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS for frontend communication

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const Room = require("./models/Room");
const User = require("./models/User");


// Sample route
app.get("/", (req, res) => {
  res.send("RoomForge Server is running!");
});

const roomRoutes = require("./routes/roomRoutes");
app.use("/api/rooms", roomRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

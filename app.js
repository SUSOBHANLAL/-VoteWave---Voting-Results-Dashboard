const express = require("express");
const connectDB = require("./config/db");
const voteRoutes = require("./routes/voteRoutes");

const app = express();

// Connect to MongoDB
connectDB();

const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", voteRoutes);

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

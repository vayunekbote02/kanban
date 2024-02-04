const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors");

// configurations
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

// constants
const PORT = process.env.PORT || 8080;

// endpoints
app.get("/", (req, res) => {
  res.send("<h1>Hello, User. Your app is up and running!</h1>");
});

// starting server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

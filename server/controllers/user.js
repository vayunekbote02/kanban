const User = require("../models/user");
const generateToken = require("../config/generateToken");

/* Register User */
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    if (user) {
      const token = await generateToken(user._id, "24h");
      res.status(201).json({ user, token });
    }
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email address
      res.status(11000).json({
        error:
          "An account with this username already exists! Please try another username.",
      });
    } else {
      res.status(404).json({ error: "Signup failed" });
    }
  }
};

const logInUser = async (req, res) => {
  console.log("In Login");
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({ user, token: generateToken(user._id, "24h") });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
};

module.exports = { registerUser, logInUser };

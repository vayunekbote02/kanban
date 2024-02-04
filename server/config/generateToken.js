const jwt = require("jsonwebtoken");

const generateToken = (id, expires_in) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: expires_in,
  });
};

module.exports = generateToken;

const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const tokenDecoded = jsonwebtoken.verify(
        bearer,
        process.env.TOKEN_SECRET_KEY
      );
      return tokenDecoded;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};

const verifyToken = async (req, res, next) => {
  const token = tokenDecode(req);
  if (token) {
    const user = await User.findById(token.id);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { tokenDecode };

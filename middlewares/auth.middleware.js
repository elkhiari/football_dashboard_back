const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed: No token provided." });
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(id, { password: 0 });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed: Invalid token." });
  }
};

const authAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      message: "Access Denied: You must be an admin to perform this action.",
    });
  }
  next();
};

const checkMailAndUsername = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    const userByEmail = await userModel.findOne({ email });
    const userByUsername = await userModel.findOne({ username });

    if (userByEmail && userByUsername) {
      return res
        .status(400)
        .json({ message: "Email and username already taken" });
    }

    if (userByEmail) {
      return res.status(400).json({ message: "Email taken" });
    }

    if (userByUsername) {
      return res.status(400).json({ message: "Username taken" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { auth, checkMailAndUsername, authAdmin };

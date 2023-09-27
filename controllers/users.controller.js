const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const sendCredentialsEmail = require("../mail/cardinality.mail");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Please provide username and password" });
    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict", // Helps protect against CSRF attacks
      path: "/", // Cookie available throughout the app
    });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
    });
    sendCredentialsEmail({
      username,
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({}, { password: 0 })
      .sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setNotDefault = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findByIdAndUpdate(_id, {
      defaultProfile: false,
    });
    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const { file } = req.body;
    console.log(_id);
    const response = await axios.post("https://api.imgbb.com/1/upload", {
      key: process.env.imgbb,
      image: file,
    });
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ message: "Image upload failed." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  login,
  addUser,
  getMe,
  getUsers,
  deleteUser,
  logout,
  setNotDefault,
  updateProfile,
};

const userRoute = require("express").Router();
const {
  login,
  addUser,
  getMe,
  getUsers,
  deleteUser,
  setNotDefault,
  updateProfile,
  logout,
} = require("../controllers/users.controller");
const {
  auth,
  authAdmin,
  checkMailAndUsername,
} = require("../middlewares/auth.middleware");

userRoute.route("/login").post(login);
userRoute.route("/logout").post(auth, logout);
userRoute.route("/add").post(auth, authAdmin, checkMailAndUsername, addUser);
userRoute.route("/me").get(auth, getMe);
userRoute.route("/").get(auth, getUsers);
userRoute.route("/delete/:id").delete(auth, authAdmin, deleteUser);
userRoute.route("/profile").post(auth, setNotDefault).put(auth, updateProfile);

module.exports = userRoute;

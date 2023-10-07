const channelRoute = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth.middleware");

const {
  getAllChannels,
  addChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channels.controller");

channelRoute.route("/").get(auth, getAllChannels).post(auth, addChannel);
channelRoute.route("/:id").delete(auth, authAdmin, deleteChannel).put(auth,updateChannel);

module.exports = channelRoute;

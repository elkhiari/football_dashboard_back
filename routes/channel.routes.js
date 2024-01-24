const channelRoute = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth.middleware");

const {
  getAllChannels,
  addChannel,
  updateChannel,
  deleteChannel,
  getAllChannelsByCategory
} = require("../controllers/channels.controller");

channelRoute.route("/").get(getAllChannels).post(auth, addChannel);
channelRoute
  .route("/:id")
  .delete(auth, authAdmin, deleteChannel)
  .put(auth, updateChannel)
  .get(getAllChannelsByCategory);

module.exports = channelRoute;

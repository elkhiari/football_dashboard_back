const channelRoute = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth.middleware");

const {
  getAllChannels,
  addChannel,
  updateChannel,
  deleteChannel,
} = require("../controllers/channels.controller");

<<<<<<< HEAD
channelRoute.route("/").get(auth, getAllChannels).post(auth, addChannel);
channelRoute.route("/:id").delete(auth, authAdmin, deleteChannel).put(auth,updateChannel);
=======
channelRoute.route("/").get(getAllChannels).post(auth, addChannel);
channelRoute.route("/:id").delete(auth, authAdmin, deleteChannel);
>>>>>>> f29afd7ca0cf8d926167d82083c257cbbf9b2f65

module.exports = channelRoute;

const ChannelModel = require("../models/channel.model");

const getAllChannels = async (req, res) => {
  try {
    const channels = await ChannelModel.find({});
    res.status(200).json({ channels });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteChannel = async (req, res) => {
  try {
    const deletedChannel = await ChannelModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addChannel = async (req, res) => {
  try {
    const newChannel = await ChannelModel.create(req.body);
    res.status(201).json({ message: "Channel created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllChannels,
  deleteChannel,
  addChannel,
};

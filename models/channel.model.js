const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Channel name is required"],
      minlength: [3, "Channel name must be at least 3 characters long"],
    },
    logo: {
      type: String,
      required: [true, "Channel logo is required"],
      minlength: [3, "Channel logo must be at least 3 characters long"],
    },
    link: {
      type: String,
      required: [true, "Channel link is required"],
      minlength: [3, "Channel link must be at least 3 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Channel", ChannelSchema);

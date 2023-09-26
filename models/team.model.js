const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: [true, "Team already exists"],
    },
    logo: {
      type: String,
      trim: true,
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "league",
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("team", teamSchema);
module.exports = Team;

const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "league",
      required: [true, "League is required"],
      trim: true,
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: [true, "Home team is required"],
      trim: true,
    },
    homeTeamScore: {
      type: Number,
      default: 0,
      trim: true,
    },
    awayTeamScore: {
      type: Number,
      default: 0,
      trim: true,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: [true, "Away team is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
      required: [true, "Channel is required"],
      trim: true,
    },
    resume: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("match", matchSchema);
module.exports = Match;

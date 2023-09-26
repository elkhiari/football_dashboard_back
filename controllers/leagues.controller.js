const leagueModel = require("../models/league.model");
const teamModel = require("../models/team.model");

const getAllLeagues = async (req, res) => {
  try {
    const leagues = await leagueModel.find({});
    res.status(200).json({ leagues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addLeague = async (req, res) => {
  try {
    const { name, logo } = req.body;
    const league = await leagueModel.create({ name, logo });
    res.status(201).json({ message: "League created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLeague = async (req, res) => {
  try {
    const { id } = req.params;
    await teamModel.deleteMany({ league: id });
    await leagueModel.findByIdAndDelete(id);
    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllLeagues, addLeague, deleteLeague };

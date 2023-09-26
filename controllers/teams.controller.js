const teamModel = require("../models/team.model");

const getAllTeams = async (req, res) => {
  try {
    const teams = await teamModel.find({}).populate("league");
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTeam = async (req, res) => {
  try {
    const { name, logo, league } = req.body;
    const team = await teamModel.create({ name, logo, league });
    res.status(201).json({ message: "Team created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await teamModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTeams, addTeam, deleteTeam };

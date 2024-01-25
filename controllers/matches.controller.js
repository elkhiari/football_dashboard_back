const matchModel = require("../models/match.model");
const teamModel = require("../models/team.model");
const channelModel = require("../models/channel.model");
const leagueModel = require("../models/league.model");

const getAllData = async (req, res) => {
  try {
    const teams = await teamModel.find({}).populate("league");
    const channels = await channelModel.find({});
    const leagues = await leagueModel.find({});
    res.status(200).json({ teams, channels, leagues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodayMatches = async (req, res) => {
  try {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0];
    const todayMatches = await matchModel
      .find({
        date: todayDateString,
        resume: req.query.resume == "true" ? { $nin: [null, ''] } : { $in: [null, '']},
      })
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ matches: todayMatches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTomorrowMatches = async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split("T")[0];
    const tomorrowMatches = await matchModel
      .find({ 
        date: tomorrowDateString,
      })
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ matches: tomorrowMatches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMatches = async (req, res) => {
  try {
    const matches = await matchModel
      .find({resume: req.query.resume === "true" ? { $nin: [null, ''] } : { $in: [null, '']}})
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMatch = async (req, res) => {
  try {
    const { homeTeam, awayTeam, channel, date, time, league } = req.body;
    const match = await matchModel.create({
      homeTeam,
      awayTeam,
      channel,
      date,
      time,
      league,
    });
    res.status(201).json({ message: "Match created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    await matchModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getYesterdaysMatches = async (req, res) => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateString = yesterday.toISOString().split("T")[0];
    const yesterdayMatches = await matchModel
      .find({ 
        date: yesterdayDateString,
        resume: req.query.resume === "true" ? { $nin: [null, ''] } : { $in: [null, '']}
      
      })
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ matches: yesterdayMatches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await matchModel
      .findById(id)
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatchByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const match = await matchModel
      .find({ date })
      .populate("homeTeam awayTeam channel");
    res.status(200).json({ match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatchByTeam = async (req, res) => {
  try {
    const { team } = req.params;
    const match = await matchModel
      .find({ team })
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatchByChannel = async (req, res) => {
  try {
    const { channel } = req.params;
    const match = await matchModel
      .find({ channel })
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatchByLeague = async (req, res) => {
  try {
    const { league } = req.params;
    const match = await matchModel
      .find({ league })
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatchByTeamAndDate = async (req, res) => {
  try {
    const { team, date } = req.params;
    const match = await matchModel
      .find({ team, date })
      .populate("homeTeam awayTeam channel league");
    res.status(200).json({ match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMatches = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await matchModel.findByIdAndUpdate(id,req.body);
    res.status(200).json({ message: "Matches updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTodayMatches,
  getTomorrowMatches,
  getAllMatches,
  addMatch,
  deleteMatch,
  getYesterdaysMatches,
  getMatchById,
  getMatchByDate,
  getMatchByTeam,
  getMatchByChannel,
  getMatchByLeague,
  getMatchByTeamAndDate,
  getAllData,
  updateMatches,
};

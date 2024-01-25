const categoryModel = require('../models/category.model');
const channelModel = require('../models/channel.model');
const movieModel = require('../models/movie.model');
const userModel = require('../models/user.model');
const teamModel = require('../models/team.model');
const leagueModel = require('../models/league.model');
const matchModel = require('../models/match.model');


const getStatistiaue = async (req, res) => {
    try {
        const categorie = await categoryModel.find().count();
        const channels = await channelModel.find().count();
        const movies = await movieModel.find().count();
        const users = await userModel.find().count();
        const teams = await teamModel.find().count();
        const leagues = await leagueModel.find().count();
        const matches = await matchModel.find().count();
        const today = new Date();
        const todayDateString = today.toISOString().split("T")[0];
        const todayMatches = await matchModel
            .find({
                date: todayDateString,
            })
            .count();
        res.status(200).json({ categorie, channels, movies, users, teams, leagues, matches, todayMatches });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getStatistiaue };
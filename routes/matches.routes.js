const matchRouter = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth.middleware");

const {
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
} = require("../controllers/matches.controller");

matchRouter.route("/data").get(auth, getAllData);
matchRouter.route("/today").get(getTodayMatches);
matchRouter.route("/tomorrow").get(getTomorrowMatches);
matchRouter.route("/yesterday").get(getYesterdaysMatches);
matchRouter.route("/").post(auth, addMatch);
matchRouter.route("/all").get(getAllMatches);
matchRouter
  .route("/:id")
  .get(getMatchById)
  .delete(auth, authAdmin, deleteMatch);
matchRouter.route("/date/:date").get(getMatchByDate);
matchRouter.route("/team/:team").get(getMatchByTeam);
matchRouter.route("/channel/:channel").get(getMatchByChannel);
matchRouter.route("/league/:league").get(getMatchByLeague);
matchRouter.route("/team/:team/date/:date").get(getMatchByTeamAndDate);

module.exports = matchRouter;

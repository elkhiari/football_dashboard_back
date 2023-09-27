const leagueRoute = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth.middleware");

const {
  getAllLeagues,
  addLeague,
  deleteLeague,
} = require("../controllers/leagues.controller");

leagueRoute.route("/").get(auth, getAllLeagues).post(auth, addLeague);
leagueRoute.route("/:id").delete(auth, authAdmin, deleteLeague);

module.exports = leagueRoute;

const teamsRoute = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth.middleware");
const {
  getAllTeams,
  addTeam,
  deleteTeam,
} = require("../controllers/teams.controller");

teamsRoute.route("/").get(auth, getAllTeams).post(auth, addTeam);
teamsRoute.route("/:id").delete(auth, authAdmin, deleteTeam);

module.exports = teamsRoute;

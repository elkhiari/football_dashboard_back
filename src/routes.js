const AllRoutes = require("express")();

AllRoutes.use("/users", require("../routes/users.routes"));
AllRoutes.use("/leagues", require("../routes/league.routes"));
AllRoutes.use("/teams", require("../routes/teams.routes"));
AllRoutes.use("/channel", require("../routes/channel.routes"));
AllRoutes.use("/matches", require("../routes/matches.routes"));

module.exports = AllRoutes;

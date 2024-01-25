const AllRoutes = require("express")();

AllRoutes.use("/users", require("../routes/users.routes"));
AllRoutes.use("/leagues", require("../routes/league.routes"));
AllRoutes.use("/teams", require("../routes/teams.routes"));
AllRoutes.use("/channel", require("../routes/channel.routes"));
AllRoutes.use("/matches", require("../routes/matches.routes"));
AllRoutes.use("/category", require("../routes/category.routes"));
AllRoutes.use("/notification", require("../routes/notification.routes"));
AllRoutes.use("/movies", require("../routes/movie.routes"))
AllRoutes.use("/data", require("../routes/data.routes"))

module.exports = AllRoutes;

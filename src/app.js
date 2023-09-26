const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("../db/config.db");
const AllRoutes = require("./routes");


app.use(require("cors")());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", AllRoutes);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Endpoint not found: The requested resource does not exist.",
    endpoint: req.originalUrl,
    timestamp: new Date(),
  });
});

const userExample = {
  username: "admin",
  email: "othmaneelkhiari@gmail.com",
  password: "admin",
};


const connect = async () => {
  try {
    await db(process.env.URI);
    app.listen(process.env.PORT | 8080, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;

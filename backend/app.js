const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRouter = require("./routes/AuthRouter");
const morgan = require("morgan");
const errMiddleware = require("./controllers/errorController");

dotenv.config({ path: "./config.env" });
app.use(express.json()); //Parse incoming JSON
app.use(morgan("dev"));
app.use("/api/auth", authRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found!",
  });
});

app.use(errMiddleware); //Global error middleware
module.exports = app;

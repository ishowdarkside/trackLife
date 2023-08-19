const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const App = express();

module.exports = App;

require("dotenv").config();
const sequelize = require("./db");

const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started at port ${PORT}...`));
  } catch (error) {
    console.error(err);
  }
};

start();

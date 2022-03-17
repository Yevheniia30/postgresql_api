require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const sequelize = require("./db");
const models = require("./models/models");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const router = require("./routes/index");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/api", router);
// error call at last
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "WORKING!!!!" });
// });

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

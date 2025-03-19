const express = require("express");
const app = express();
const db = require("./connection/db");
const bodyParser = require("body-parser");
const schoolRoutes= require("./routes/schoolRoutes")
require('dotenv').config()
app.use(express.json());

app.use(bodyParser.json());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Student Management Application." });
});
app.use("/api", schoolRoutes);
const PORT = process.env.PORT || 8080;

db.query("SELECT 1")
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => console.log("error occured", err));
// set port, listen for requests

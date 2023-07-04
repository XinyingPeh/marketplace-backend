require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// Temporal route
app.get("/", (req, res) => {
  res.send("This is homepage!");
});

// Listener
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DataBase connected");

    // boot up app
    app.listen(port, () => {
      console.log("GitPub running on port: ", port);
    });
  })
  .catch((err) => {
    console.log("error when connecting: " + err);
  });

require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const itemRouter = require("./routers/item_router");

// parse URL-encoded data from form
app.use(express.urlencoded({ extended: true }));
// handle JSON payloads sent in API requests
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// handle cors pre-flight requests
app.options("*", cors());

// API endpoint routes
app.use("/api/items", itemRouter);

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

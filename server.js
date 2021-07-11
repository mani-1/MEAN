"use strict";

/******************************* Dependency Area **************************/

var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = express.Router();
var appRoutes = require("./app/models/routes/api")(router);
var path = require("path");
/************************************ MonogDB Config Area **************************/

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://test:test@cluster0.nxhju.mongodb.net/Agularjs?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db..");
    // Listen the port 8080
    app.listen(port, function () {
      console.log("Running the server.. " + port);
    });
  })
  .catch((err) => console.log(err));

/*******************************************  Middle Ware Area *******************************************/

// Invoke the express and place it in app variable
var app = express();

app.use(morgan("dev"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/api", appRoutes);
/****************************** Request Area  ******************************************/

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/app/models/public/app/view/index.html"));
});
// Setting up the port number
var port = process.env.PORT || 8080;

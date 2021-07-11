"use strict";

/******************************* Dependency Area **************************/

var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var User = require("./app/models/user");
var bodyParser = require("body-parser");

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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(morgan("dev"));

/****************************** Request Area  ******************************************/

//http://localhost:8080/users
app.post("/users", function (req, res) {
  var user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  if (
    user.username === null ||
    user.username === "" ||
    user.password == null ||
    user.password == "" ||
    user.email == null ||
    user.email == ""
  ) {
    res.send("Ensure username, password and email must be enterd !");
  } else {
    user.save(function (err) {
      if (err) {
        res.send("User or Email already exists !!");
      } else {
        res.send("user created");
      }
    });
  }
});

// Setting up the port number
var port = process.env.PORT || 8080;

const { Model } = require("objection");
const knex = require("./knex");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const UserSchema = require("./validation");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createUser = require("./userQueries");

// Give the knex instance to objection.
Model.knex(knex);

const config = {
  name: "exo_1_app",
  port: 8080,
};

// The order here matters.
// This will ensure that the body-parser will run before our route,
// which ensures that our route can then access the parsed HTTP POST body.
// app.use(bodyParser.json);
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

app.post("/signup", function (req, res) {
  const result = UserSchema.validate(req.body);
  if (result.error) {
    res.send(result.error.details);
  } else {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      let newUser = createUser(req.body.username, hash);
      // console.log(newUser);
    });
    res.send("success");
  }
});

app.listen(config.port, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  console.log(`${config.name} running on ${config.port}`);
});

const { Model } = require("objection");
const knex = require("./knex");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const UserSchema = require("./validation");
const bcrypt = require("bcrypt");
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

app.post("/signup", async function (req, res) {
  const validation = UserSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details);
  }
  try {
    let hash = await hashPassword(req.body.password);
    let newUser = await createUser(req.body.username, hash);
    return res.json(newUser);
  } catch (error) {
    return res.send(error);
  }
});

const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

app.listen(config.port, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  console.log(`${config.name} running on ${config.port}`);
});

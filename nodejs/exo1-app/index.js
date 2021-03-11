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

app.post("/signup", async function (req, res) {
  const validation = UserSchema.validate(req.body);
  if (validation.error) {
    return res.status(500).json(validation.error.details);
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await createUser(req.body.username, hashedPassword);
    return res.json(newUser);
  } catch (e) {
    return res.status(500).json("Sorry, there is an error");
  }
});

app.listen(config.port, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  console.log(`${config.name} running on ${config.port}`);
});

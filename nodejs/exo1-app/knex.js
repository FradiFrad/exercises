require("dotenv").config();

const {
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DOCKER_HOST,
  MYSQL_PORT,
} = process.env;

const config = {
  client: "mysql",
  connection: {
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    host: MYSQL_DOCKER_HOST,
    port: MYSQL_PORT,
  },
};

// Warning : we have to use 2 different configs
// - the knexfile.js config is linked to localhost, because we chose to launch our migrations not in Docker container but on our computer
// - the const config here is linked to the docker host of the db, aka the name of the service defined in docker-compose
module.exports = require("knex")(config);

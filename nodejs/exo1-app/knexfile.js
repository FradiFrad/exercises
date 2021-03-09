require("dotenv").config();
const {
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_PORT,
} = process.env;

module.exports = {
  client: "mysql",
  connection: {
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
  },
};

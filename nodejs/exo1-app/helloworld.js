console.log("hello world");

// const knex = require("knex")({
//   client: "pg",
//   connection: process.env.PG_CONNECTION_STRING,
//   searchPath: ["knex", "public"],
// });

// exports.up = function (knex) {
//   return knex.schema.createTable("users", function (table) {
//     table.increments("id");
//     table.string("username", 255).notNullable();
//     table.string("password", 255).notNullable();
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTable("users");
// };

// exports.config = { transaction: false };

var express = require("express");
var app = express();

const config = {
  name: "exo_1_app",
  port: 8080,
};

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(config.port, (e) => {
  if (e) {
    throw new Error("Internal Server Error");
  }
  console.log(`${config.name} running on ${config.port}`);
});

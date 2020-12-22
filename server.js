const express = require("express");
const path = require("path");

const app = express();

const jsonServer = require('json-server')
const router = jsonServer.router(path.join(__dirname, "../db.json"))

app.use('/api', router);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "../build", "index.html"));
});

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log("❇️ VManager Demo server is running on port", port);
});

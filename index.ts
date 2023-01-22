import express from "express";

const app = express();
const PORT = 3000;

const db = require("./Database/dbconfig");
db();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

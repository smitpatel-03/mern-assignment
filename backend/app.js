const express = require("express");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.json({
    success: true,
  });
});
module.exports = app;

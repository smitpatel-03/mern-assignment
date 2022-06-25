const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({
  path: "backend/config/config.env",
});

app.listen(process.env.PORT, (req, res, next) => {
  console.log("Runnig on port ", process.env.PORT);
});

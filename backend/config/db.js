const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/mern-assignment")
    .then((data) => {
      console.log(
        "Database has been connected successfully to ",
        data.connection.host
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;

const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect("mongodb://localhost:27107/mern-assignment").then((data) => {
    console.log(
      "Database has been connected successfully to ",
      data.connection.host
    );
  });
};

module.exports = connectDb;

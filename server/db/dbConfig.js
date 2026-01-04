const mongoose = require("mongoose");

const dbConfig = () => {
  mongoose
    .connect(process.env.DB_STRING)
    .then(() => console.log("Database Connected!"));
};

module.exports = dbConfig;

//node-e-commerce:node69e-commerce

const express = require("express");
const dbConfig = require("./db/dbConfig");
require("dotenv").config();
const cors = require("cors");
const route = require("./routes/route");

const app = express();
app.use(express.json());
app.use(cors());
dbConfig();
app.use(route);
app.listen(6969, () => {
  console.log("server is running on port:6969");
});

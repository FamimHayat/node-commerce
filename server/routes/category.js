const express = require("express");
const { createCategory } = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const roleChecker = require("../middlewares/roleChecker");
const upload = multer();

const route = express.Router();

route.post(
  "/create",
  upload.single("thumbnail"),
  authMiddleware,
  roleChecker("admin", "editor"),
  createCategory
);

module.exports = route;

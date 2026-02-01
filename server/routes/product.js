const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleChecker = require("../middlewares/roleChecker");
const { createProduct } = require("../controllers/productController");
const route = express.Router();
const multer = require("multer");
const upload = multer();

route.post(
  "/upload",
  authMiddleware,
  roleChecker("admin", "editor"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  createProduct
);

module.exports = route;

const express = require("express");
const router = express.Router();

const apiAuth = require("./authentication");
router.use("/auth", apiAuth);

const apiItem = require("./item");
router.use("/item", apiItem);

module.exports = router;

const express = require("express");

const item = express.Router();
const itemController = require("../controllers/itemControllers");

item.post("/create", itemController.addItemAction);
item.get("/", itemController.getUserItemAction);
item.post("/delete", itemController.removeItemAction);

module.exports = item;

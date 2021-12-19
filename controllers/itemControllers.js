const { Item } = require("../models");

const addItemAction = (req, res) => {
  Item.addItem(req.body)
    .then((message) => res.status(201).send(message))
    .catch((error) => res.status(409).send(error));
};

const getUserItemAction = (req, res) => {
  Item.findAll({
    where: { user_id: req.query.user_id },
  })
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(409).send(error));
};

const removeItemAction = (req, res) => {
  Item.deleteItem(req.body)
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(401).send(error));
};

module.exports = { addItemAction, getUserItemAction, removeItemAction };

const { User } = require("../models");

const registerAction = (req, res) => {
  User.register(req.body)
    .then((message) => res.status(201).send(message))
    .catch((error) => res.status(409).send(error));
};

const loginAction = (req, res) => {
  User.login(req.body)
    .then((user) => {
      res.json({
        auth: true,
        token: user.generateToken(),
        user,
      });
    })
    .catch((error) => res.status(401).send(error));
};

module.exports = { registerAction, loginAction };

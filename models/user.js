"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Item, {
        foreignKey: "id",
        as: "user_item_id",
      });
    }

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
      };

      const token = jwt.sign(payload, "nutech");

      return token;
    };

    static register = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } });
        if (user) {
          return Promise.reject("Username already register");
        }

        return Promise.resolve("Register Success").then(
          this.create({
            username,
            password,
          })
        );
      } catch (error) {
        return Promise.reject(error);
      }
    };

    static login = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } });

        if (!user || user.password !== password) {
          return Promise.reject("Invalid username or password !!");
        }

        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

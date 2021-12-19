"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      models.Item.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "item_user_id",
      });
    }

    static addItem = async ({
      name,
      urlImg,
      purchase_price,
      selling_price,
      quantity,
      userId,
    }) => {
      const item = await this.findOne({ where: { name } });
      try {
        if (item) {
          return Promise.reject("Nama barang sudah ada");
        }

        return Promise.resolve("Barang berhasi ditambahkan").then(
          this.create({
            name,
            url_img: urlImg,
            purchase_price,
            selling_price,
            quantity,
            user_id: userId,
          })
        );
      } catch (error) {
        return Promise.reject(error);
      }
    };

    static deleteItem = async ({ name, user_id }) => {
      try {
        const item = await this.findOne({
          where: { name, user_id },
        });

        return Promise.resolve("Barang Dihapus").then(
          this.destroy({ where: { name, user_id } })
        );
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  Item.init(
    {
      name: DataTypes.STRING,
      url_img: DataTypes.STRING,
      purchase_price: DataTypes.INTEGER,
      selling_price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};

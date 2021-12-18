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
      purchasePrice,
      sellingPrice,
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
            purchase_price: purchasePrice,
            selling_price: sellingPrice,
            quantity,
            user_id: userId,
          })
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

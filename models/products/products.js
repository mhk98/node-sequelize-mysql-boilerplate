const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const products = sequelize.define("products", {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      
    },

    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

  });

  return products;
};
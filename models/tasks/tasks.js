const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const tasks = sequelize.define("tasks", {
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

    status: {
      type: DataTypes.STRING,
      defaultValue: "To Do",
      enum: ["To Do", "In Progress", "Done"],
      
    },
  });

  return tasks;
};
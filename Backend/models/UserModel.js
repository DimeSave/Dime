const { DataTypes } = require("sequelize");
const database = require("./../database");

const userModels = database.define("userModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: DataTypes.CHAR,
    unique: true,
  },

  address: {
    type: DataTypes.CHAR,
    unique: true,
  },

  password: DataTypes.CHAR,
});

module.exports = userModels;

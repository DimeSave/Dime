import {
  Model,
  Sequelize,
  DataTypes
} from "sequelize";
import  db  from "../config/dbconfig.js";

const TABLE_NAME = "userModels";


// class userModels extends Model
//  {
//    id
//    firstName
//   lastName
//   email
//   password
//   phone
//   verifyEmailToken
//   resetToken
//   isVerified
//   resetTokenExpiry
// }

const userModels = db.define("users",

  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verifyEmailToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
);

export default userModels;

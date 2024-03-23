import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import ENV from "./env.js";

dotenv.config()

export const db = new Sequelize(
  ENV.DB_NAME,
  ENV.DB_USERNAME,
  ENV.DB_PASSWORD,
  {
    host: ENV.DB_HOST,
    dialect: "mysql",
  }
);

  
// db.authenticate()
//    .then(() => {
//     console.log("DATABASE CONNECTED");
//    }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//    });


export default db;

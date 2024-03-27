import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config()

const DB_NAME = process.env.NODE_ENV === "production" ? process.env.PROD_DB_NAME : process.env.DB_NAME;
const DB_USERNAME = process.env.NODE_ENV === "production" ? process.env.PROD_DB_USERNAME : process.env.DB_USERNAME;
const DB_PASSWORD = process.env.NODE_ENV === "production" ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD;
const DB_HOST = process.env.NODE_ENV === 'production' ? process.env.PROD_DB_HOST : process.env.DB_HOST


export const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

export default db;

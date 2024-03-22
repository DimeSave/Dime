import { Sequelize } from "sequelize";

const database = new Sequelize({
  dialect: "mysql",
  storage: "./database.mysql2",
});

export default database;

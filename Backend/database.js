import { Sequelize } from "sequelize";

const database = new Sequelize({
  dialect: "postgres",
  storage: "./database.postgres",
});

export default database;

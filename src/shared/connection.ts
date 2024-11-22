import { Sequelize, DataTypes, Model } from "sequelize";
import mysql2 from 'mysql2';

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: "mysql",
  database: "csv",
  username: "root",
  password: "123456",
  host: "localhost",
  port: 3306,
  dialectModule: mysql2,
  dialectOptions: {
    charset: 'utf8mb4', // Força o uso do charset utf8mb4
  },
});

export default sequelize;

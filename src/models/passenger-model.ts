import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection.js";

export class Passenger extends Model {
  id!: number;
  PassengerId!: number;
  Survived!: number;
  Pclass!: number;
  Name!: string;
  Sex!: string;
  Age!: number;
  SibSp!: number;
  Parch!: number;
  Ticket!: string;
  Fare!: number;
  Cabin!: string;
  Embarked!: string;
}

export const initializePassenger = () => {
  Passenger.init(
    {
      PassengerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Survived: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Pclass: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      SibSp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Parch: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Ticket: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Fare: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Cabin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Embarked: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "passengers", // Nome da tabela no banco de dados
    }
  );
  
};



// controllers/csv-import-controller.ts
import { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";
import { Passenger } from "../models/passenger-model.js";

// Tipagem de passengers agora será o tipo do Sequelize
export const importCsv = async (req: Request, res: Response): Promise<void> => {
    const filePath = "L:\\Drivers\\titanic.csv";  


  const passengers: {
    PassengerId: number;
    Survived: number;
    Pclass: number;
    Name: string;
    Sex: string;
    Age: number | null;
    SibSp: number;
    Parch: number;
    Ticket: string;
    Fare: number;
    Cabin: string | null;
    Embarked: string;
  }[] = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      // Mapeando os dados para o formato esperado pelo Sequelize
      passengers.push({
        PassengerId: parseInt(data.PassengerId),
        Survived: parseInt(data.Survived),
        Pclass: parseInt(data.Pclass),
        Name: data.Name,
        Sex: data.Sex,
        Age: data.Age ? parseInt(data.Age) : null, 
        SibSp: parseInt(data.SibSp),
        Parch: parseInt(data.Parch),
        Ticket: data.Ticket,
        Fare: parseFloat(data.Fare),
        Cabin: data.Cabin || null, 
        Embarked: data.Embarked,
      });
    })
    .on("end", async () => {
      try {
        await Passenger.bulkCreate(passengers, {
          updateOnDuplicate: [
            "Survived", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked"
          ]
        });
        res.status(200).send("CSV importado com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar dados no banco:", error);
        res.status(500).send("Erro ao importar CSV.");
      }
    });
};

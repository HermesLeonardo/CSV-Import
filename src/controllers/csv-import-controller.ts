import { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import { Passenger } from "../models/passenger-model.js";

// Função para criar um novo passageiro
export const createPassenger = async (req: Request, res: Response): Promise<void> => {
  try {
    const { PassengerId, Survived, Pclass, Name, Sex, Age, SibSp, Parch, Ticket, Fare, Cabin, Embarked } = req.body;

    if (!PassengerId || !Name || !Sex || !Ticket || !Fare || !Embarked) {
      res.status(400).send("Dados faltando ou inválidos.");
      return;
    }

    const newPassenger = await Passenger.create({
      PassengerId,
      Survived,
      Pclass,
      Name,
      Sex,
      Age,
      SibSp,
      Parch,
      Ticket,
      Fare,
      Cabin,
      Embarked,
    });

    res.status(201).send({
      message: "Passageiro criado com sucesso!",
      data: newPassenger,
    });
  } catch (error) {
    console.error("Erro ao criar passageiro:", error);
    res.status(500).send("Erro ao criar passageiro.");
  }
};

// Função para listar todos os passageiros
export const getPassengers = async (req: Request, res: Response): Promise<void> => {
  try {
    const passengers = await Passenger.findAll();
    res.status(200).send({
      message: "Passageiros recuperados com sucesso!",
      data: passengers,
    });
  } catch (error) {
    console.error("Erro ao listar passageiros:", error);
    res.status(500).send("Erro ao listar passageiros.");
  }
};

// Função para buscar um passageiro por ID
export const getPassengerById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const passenger = await Passenger.findByPk(id);

    if (!passenger) {
      res.status(404).send("Passageiro não encontrado.");
      return;
    }

    res.status(200).send({
      message: "Passageiro encontrado com sucesso!",
      data: passenger,
    });
  } catch (error) {
    console.error("Erro ao buscar passageiro:", error);
    res.status(500).send("Erro ao buscar passageiro.");
  }
};

// Função para atualizar um passageiro
export const updatePassenger = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { PassengerId, Survived, Pclass, Name, Sex, Age, SibSp, Parch, Ticket, Fare, Cabin, Embarked } = req.body;

  try {
    const passenger = await Passenger.findByPk(id);

    if (!passenger) {
      res.status(404).send("Passageiro não encontrado.");
      return;
    }

    const updatedPassenger = await passenger.update({
      PassengerId,
      Survived,
      Pclass,
      Name,
      Sex,
      Age,
      SibSp,
      Parch,
      Ticket,
      Fare,
      Cabin,
      Embarked,
    });

    res.status(200).send({
      message: "Passageiro atualizado com sucesso!",
      data: updatedPassenger,
    });
  } catch (error) {
    console.error("Erro ao atualizar passageiro:", error);
    res.status(500).send("Erro ao atualizar passageiro.");
  }
};

// Função para deletar um passageiro
export const deletePassenger = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const passenger = await Passenger.findByPk(id);

    if (!passenger) {
      res.status(404).send("Passageiro não encontrado.");
      return;
    }

    await passenger.destroy();

    res.status(200).send({
      message: "Passageiro deletado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao deletar passageiro:", error);
    res.status(500).send("Erro ao deletar passageiro.");
  }
};

// Função para importar passageiros de um arquivo CSV
export const importCsv = async (req: Request, res: Response): Promise<void> => {
  const filePath = "L:\\Drivers\\titanic.csv"; // Altere o caminho conforme necessário

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
            "Survived", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked",
          ],
        });
        res.status(200).send("CSV importado com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar dados no banco:", error);
        res.status(500).send("Erro ao importar CSV.");
      }
    });
};

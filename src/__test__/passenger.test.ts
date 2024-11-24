import request from "supertest";
import path from "path";
import { app } from "../app";
import sequelize from "../shared/connection";
import supertest from "supertest";
import { Passenger } from "../models/passenger-model";

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
});

afterAll(async () => {
  await sequelize.close();
});

describe("Testando os endpoints de CSV e passageiros", () => {
  const csvFilePath = path.join(__dirname, "..", "Drivers", "titanic.csv");

  it("POST /API/import-csv - Teste para importar o arquivo CSV ou retornar dados existentes", async () => {
    // Primeiro teste: importação inicial
    const firstResponse = await supertest(app).post("/API/import-csv").send({
      file: csvFilePath,
    });
    expect(firstResponse.status).toBe(200);
    // Verifica uma das mensagens esperadas
    const validMessages = ["CSV importado com sucesso!", "Dados já existentes no banco de dados."];
    expect(validMessages).toContain(firstResponse.body.message);

    // Segundo teste: tenta importar novamente
    const secondResponse = await supertest(app).post("/API/import-csv").send({
      file: csvFilePath,
    });
    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body.message).toBe("Dados já existentes no banco de dados.");
  });

  it("DELETE /API/passenger/1 - Teste que deve excluir um passageiro com ID 1", async () => {
    const response = await request(app).delete("/API/passenger/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Passageiro deletado com sucesso!");
  });

  it("POST /API/passenger - Teste que deve criar um passageiro com ID 1, que foi excluido anteriormente", async () => {
    const newPassenger = {
      PassengerId: 1,
      Survived: 0,
      Pclass: 3,
      Name: "Braund, Mr. Owen Harris",
      Sex: "male",
      Age: 22,
      SibSp: 1,
      Parch: 0,
      Ticket: "A/5 21171",
      Fare: 7.25,
      Cabin: null,
      Embarked: "S",
    };

    const response = await request(app).post("/API/passenger").send(newPassenger);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Passageiro criado com sucesso!");
    expect(response.body.data.PassengerId).toBe(newPassenger.PassengerId);
    expect(response.body.data.Name).toBe(newPassenger.Name);
  });

  it("PUT /API/passenger/1 - Teste que deve atualizar apenas o nome do passageiro com ID 1", async () => {
    const updatedPassenger = { Name: "John Doe" };

    const response = await request(app).put("/API/passenger/1").send(updatedPassenger);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Passageiro atualizado com sucesso!");
    expect(response.body.data.Name).toBe(updatedPassenger.Name);
  });

  it("GET /API/passenger - Teste que deve retornar todos os passageiros presentes no CSV", async () => {
    const response = await request(app).get("/API/passenger");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Passageiros recuperados com sucesso!");
  });
});

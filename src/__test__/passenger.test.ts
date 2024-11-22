import request from "supertest";
import path from "path";
import { app } from "../app.js"; // Asegure-se de que o caminho esteja correto
import sequelize from "../shared/connection";

console.log(process.env.DB_HOST);

jest.mock("fs");

beforeAll(async () => {
  console.log('DB_HOST:', process.env.DB_HOST); // Confirma se a URL do DB está sendo lida
  await sequelize.sync({ force: true }); // Deleta e recria as tabelas antes de rodar os testes
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testando os endpoints de CSV e passageiros', () => {

  // Teste de exclusão do passageiro
  it("DELETE /API/passenger/1 - Deve excluir um passageiro com ID 1", async () => {
    const response = await request(app).delete("/API/passenger/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Passageiro deletado com sucesso!");
  });

  // Teste de criação do passageiro
  it("POST /API/passenger - Deve criar um passageiro com ID 1", async () => {
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
      Embarked: "S"
    };

    const response = await request(app)
      .post("/API/passenger")
      .send(newPassenger);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Passageiro criado com sucesso!");
    expect(response.body.data.PassengerId).toBe(newPassenger.PassengerId);
    expect(response.body.data.Name).toBe(newPassenger.Name);
  });

  // Teste de listagem de passageiros
  it("GET /passenger - Deve retornar todos os passageiros", async () => {
    const response = await request(app).get("/API/passenger");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Passageiros recuperados com sucesso!");
  });
});

const request = require('supertest');
const path = require('path');
const { app, sequelize } = require("../app.js")

console.log(process.env.DB_HOST); // Exemplo para confirmar a URL do banco de dados

/*
beforeAll(async () => {
  // Iniciar o banco de dados antes de executar os testes
  await sequelize.sync({ alter: true });
});
*/


describe('Testando os endpoints de CSV e passageiros', () => {
  // Teste de importação de CSV
  /*
  it('POST /API/import-csv - Deve importar o arquivo CSV', async () => {
    const filePath = path.join('L:', 'Drivers', 'titanic.csv');

    const response = await request(app)
      .post('/API/import-csv')  
      .send({ filePath: filePath });

    expect(response.status).toBe(200);
    expect(response.text).toBe('CSV importado com sucesso!');
  });
  */

  // Teste de listagem de passageiros
  it('GET /API/passenger - Deve retornar todos os passageiros', async () => {
    const response = await request(app).get('/API/passenger');
    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Passageiros recuperados com sucesso!');
    expect(response.body.data.length).toBeGreaterThan(0);
  });



  /*
  // Teste de busca por ID
  it('GET /API/passenger/:id - Deve retornar um passageiro específico', async () => {
    const response = await request(app).get('/API/passenger/1');  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Passageiro encontrado com sucesso!');
    expect(response.body.data.PassengerId).toBe(1);
  });
  */


  /*
  // Teste de criação de passageiro
  it('POST /API/passenger - Deve criar um novo passageiro', async () => {
    const newPassenger = {
      PassengerId: 1001,
      Survived: 1,
      Pclass: 1,
      Name: 'John Doe',
      Sex: 'male',
      Age: 30,
      SibSp: 0,
      Parch: 0,
      Ticket: '12345',
      Fare: 72.5,
      Cabin: 'B42',
      Embarked: 'C',
    };

    const response = await request(app)
      .post('/API/passenger')  
      .send(newPassenger);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Passageiro criado com sucesso!');
  });
  */


});



afterAll(async () => {
  // Fechar a conexão com o banco após os testes
  await sequelize.close();
});

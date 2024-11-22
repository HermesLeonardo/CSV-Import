import express from "express";
import sequelize from "./shared/connection.js";
import csvimportroutes from "./routes/csv-import-routes.js";
import { initializePassenger } from "./models/passenger-model.js";
import { Passenger } from "./models/passenger-model.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("API para o arquivo CSV está ON-LINE");
});

app.use("/passenger", csvimportroutes);

(async () => {
  try {
    // Conecta ao banco de dados e inicializa modelos
    await sequelize.authenticate();
    console.log("Banco de dados conectado com sucesso.");

    initializePassenger();

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
})();

export default app;
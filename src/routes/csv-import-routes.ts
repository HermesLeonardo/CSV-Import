import express from "express";

import { createPassenger, getPassengers, getPassengerById, updatePassenger, deletePassenger, importCsv } from "../controllers/csv-import-controller.js";

const router = express.Router();

// Rotas CRUD para passageiros
router.post("/import-csv", importCsv); 
router.post("/passenger", createPassenger); // Criar um passageiro
router.get("/passenger", getPassengers); // Listar todos os passageiros
router.get("/passenger/:id", getPassengerById); // Obter um passageiro pelo ID
router.put("/passenger/:id", updatePassenger); // Atualizar um passageiro pelo ID
router.delete("/passenger/:id", deletePassenger); // Deletar um passageiro pelo ID

export default router;

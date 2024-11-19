import express from "express";
import { importCsv } from "../controllers/csv-import-controller.js";

const router = express.Router();

router.post("/import-csv", importCsv); 
export default router;

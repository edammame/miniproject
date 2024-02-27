import express, { Router } from "express";
import { transactionController } from "../controllers/transaction";

export const route: Router = express.Router();
route.get("/", transactionController.getTransaction);
route.post("/", transactionController.addTrasaction);

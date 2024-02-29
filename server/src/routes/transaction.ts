import express, { Router } from "express";
import { transactionController } from "../controllers/transaction";

export const route: Router = express.Router();
route.get("/", transactionController.getTransaction);
route.get(
  "/counttransaction/:eventid",
  transactionController.getCountDataTransaction
);
// route.get(
//   "/totaltransactionbyevent",
//   transactionController.
// );
route.post("/", transactionController.addTrasaction);

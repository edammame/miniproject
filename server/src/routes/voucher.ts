import express, { Router } from "express";

import { voucherController } from "../controllers/voucher";

export const route: Router = express.Router();
route.get("/", voucherController.getVoucher);
route.post("/", voucherController.postVoucher);

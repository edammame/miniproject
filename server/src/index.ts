import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
import cors from "cors";
import { config } from "dotenv";

config();

export const prisma = new PrismaClient();

export const secretKey = String(process.env.secretKey);
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/event",
  express.static(`${__dirname}/public/images/product_images`)
);

const PORT = process.env.PORT;

//routes
app.use("/users", routes.usersRoutes);
app.use("/events", routes.eventsRoutes);
app.use("/voucher", routes.voucherRoutes);
app.use("/location", routes.locationRoutes);
app.use("/transaction", routes.transactionRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || "internal server error" });
}); //error handler

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found"); //page not found handler
});

app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});

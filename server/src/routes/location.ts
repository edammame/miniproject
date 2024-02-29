import express, { Router } from "express";

import { fileUploader } from "../middlewares/multer";
import { locationController } from "../controllers/location";

export const route: Router = express.Router();
route.get("/", locationController.getLocation);

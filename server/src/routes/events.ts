import express, { Router } from "express";
import { eventController } from "../controllers/events";

export const route: Router = express.Router();
route.get("/events/", eventController.getEvents);
route.get("/events/:id", eventController.getEvents);

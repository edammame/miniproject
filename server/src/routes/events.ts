import express, { Router } from "express";
import { eventController } from "../controllers/events";
import { fileUploader } from "../middlewares/multer";

export const route: Router = express.Router();
route.get("/", eventController.getEvents);
route.get("/:eventid", eventController.getEventById);
route.patch(
  "/:eventid",
  // verifyUser,
  // verifyAdmin,
  fileUploader({
    destinationFolder: "/images/event_images",
    prefix: "EVENT",
    filetype: "image",
  }).single("image"),
  eventController.editEvent
);
route.post(
  "/",
  // verifyUser,
  // verifyAdmin,
  fileUploader({
    destinationFolder: "/images/event_images",
    prefix: "EVENT",
    filetype: "image",
  }).single("image"),
  eventController.addEvent
);

route.delete("/:eventid", eventController.deleteEvent);

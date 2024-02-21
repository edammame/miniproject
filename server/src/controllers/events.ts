import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";

export const eventController = {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventname } = req.query;
      const events = await prisma.event.findMany({
        where: {
          eventname: {
            contains: String(eventname),
          },
        },
      });
      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await prisma.event.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },
};

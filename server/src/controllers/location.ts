import { Response, Request, NextFunction } from "express";
import { prisma } from "..";

export const locationController = {
  async getLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const location = await prisma.eventbyLocation.findMany({});
      console.log(location);

      res.send({
        success: true,
        result: location,
      });
    } catch (error) {
      next(error);
    }
  },
};
import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const eventController = {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventname } = req.query;
      const events = await prisma.eventDetail.findMany({
        include: {
          user: {
            select: {
              userid: true,
              email: true,
              username: true,
            },
          },
        },
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
      const events = await prisma.eventDetail.findUnique({
        include: {
          user: {
            select: {
              userid: true,
              email: true,
              username: true,
            },
          },
        },
        where: {
          eventid: Number(req.params.eventid),
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

  async addEvent(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const {
        eventname,
        eventprice,
        starteventdate,
        endeventdate,
        eventposter,
        eventdescription,
        eventtype,
        location_id,
        availableseat,
        user_id,
      } = req.body;

      const newEvent: Prisma.EventDetailCreateInput = {
        eventname,
        eventprice,
        eventstartdate: new Date(starteventdate),
        eventenddate: new Date(endeventdate),
        eventposter: req.file?.filename,
        eventdescription,
        eventtype,
        availableseat,
        location: {
          connect: {
            locationid: Number(location_id),
          },
        },
        user: {
          connect: {
            userid: 1,
          },
        },
      };
      res.send({
        success: true,
        message: "data berhasil ditambahkan",
      });
    } catch (error) {
      next(error);
    }
  },

  //create event category
  //  const event =  await prisma.eventDetail.create({
  //     data: newCategory,
  //   });

  //   await prisma.eventCategory.create({
  //     data: {
  //       event_id : event.eventid,
  //       category_id : req.body.category_id
  //     }
  //   })
};

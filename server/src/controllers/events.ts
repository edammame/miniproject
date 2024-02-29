import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const eventController = {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventname, eventlocation } = req.query;
      const eventsR = await prisma.eventDetail.findMany({
        include: {
          location: {
            select: {
              eventlocation: true,
            },
          },
          user: {
            select: {
              userid: true,
              email: true,
              username: true,
            },
          },
          eventcategory: {
            select: {
              category: {
                select: {
                  categoryname: true,
                },
              },
            },
          },
        },
        where: {
          // or
          OR: [
            {
              eventname: {
                contains: String(eventname).toLowerCase(),
              },
            },
            {
              location: {
                eventlocation: {
                  contains: String(eventlocation).toLocaleLowerCase(),
                },
              },
            },
          ],
        },
      });
      res.send({
        success: true,
        result: eventsR,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await prisma.eventDetail.findUnique({
        include: {
          location: {
            select: {
              eventlocation: true,
            },
          },
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

  async editEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        eventname,
        eventprice,
        eventstartdate,
        eventenddate,
        eventposter,
        eventdescription,
        eventtype,
        eventlocation,
        availableseat,
        user_id,
      } = req.body;

      const editEvent: Prisma.EventDetailUpdateInput = {
        eventname,
        eventprice,
        eventstartdate: new Date(eventstartdate),
        eventenddate: new Date(eventenddate),
        eventdescription,
        eventtype,
        availableseat: Number(availableseat),
        user: {
          connect: {
            userid: 1,
            // userid: Number(user_id), // to connect to organizer?
          },
        },
        location: {
          connect: {
            locationid: Number(eventlocation),
          },
        },
      };

      if (req.file?.filename)
        editEvent.eventposter = String(req.file?.filename);

      await prisma.eventDetail.update({
        data: editEvent,
        where: {
          eventid: Number(req.params.eventid),
        },
      });
      res.send({
        success: true,
        message: "data berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.eventDetail.delete({
        where: {
          eventid: Number(req.params.eventid),
        },
      });
      res.send({
        success: true,
        message: "data berhasil dihapus",
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
        eventstartdate,
        eventenddate,

        eventdescription,
        eventtype,
        eventlocation,
        availableseat,
        eventcategories,
      } = req.body;

      const newEvent: Prisma.EventDetailCreateInput = {
        eventname,
        eventprice,
        eventstartdate: new Date(eventstartdate),
        eventenddate: new Date(eventenddate),
        eventposter: String(req.file?.filename),
        eventdescription,
        eventtype,
        availableseat: Number(availableseat),
        user: {
          connect: {
            userid: 1,
            // userid: Number(user_id), // to connect to organizer?
          },
        },
        location: {
          connect: {
            locationid: Number(eventlocation),
          },
        },
      };

      const newEv = await prisma.eventDetail.create({
        data: newEvent,
      });

      // ini untuk EventCategory .. frontend - multiselect
      const eventcategoriesInsert = eventcategories?.map((eventId: number) => {
        return {
          event_id: newEv.eventid,
          category_id: eventId,
        };
      });

      // console.log(eventcategoriesInsert);
      if (eventcategoriesInsert)
        await prisma.eventCategory.createMany({
          data: eventcategoriesInsert,
        });

      // console.log(ec);

      //endofcode

      res.send({
        success: true,
        message: "data berhasil ditambahkan",
      });
    } catch (error) {
      next(error);
    }
  },
};

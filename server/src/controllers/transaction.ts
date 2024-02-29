import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

//create transaction
export const transactionController = {
  async getTransaction(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { transactionid } = req.query;
      const transaction = await prisma.transaction.findMany({
        include: {
          user: true,
          voucher: {
            select: {
              vouchername: true,
            },
          },
          eventtransaction: {
            select: {
              event: {
                select: {
                  eventid: true,
                  eventname: true,
                },
              },
            },
          },
        },
        where: {
          user_id: req.user?.user_id,
        },
      });
      res.send({
        message: "read transaction",
        success: true,
        result: transaction,
      });
    } catch (error) {
      next(error);
    }
  },

  async addTrasaction(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const {
        qty,
        subtotalprice,
        discountprice,
        totalprice,
        user_id,
        voucher_id,
        eventtransaction,
      } = req.body;

      const newTransaction: Prisma.TransactionCreateInput = {
        qty,
        subtotalprice,
        discountprice,
        totalprice,
        user: { connect: { userid: 1 } },
        // userid: Number(user_id),
        voucher: { connect: { voucherid: voucher_id } },
      };

      const newTs = await prisma.transaction.create({
        data: newTransaction,
      });

      const eventtransactionInsert = eventtransaction.map((eventId: number) => {
        return {
          transaction_id: newTs.transactionid,
          event_id: eventId,
        };
      });

      console.log(eventtransactionInsert, "testing eventr");

      const et = await prisma.eventTransaction.createMany({
        data: eventtransactionInsert,
      });

      console.log(et);

      res.send({
        success: true,
        message: "transaction post successfully",
      });
    } catch (error) {
      console.log(error);

      next({ message: "failed to post transaction" });
    }
  },

  async getCountDataTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { eventid, eventname } = req.params;
      const countTransactionByeventid = await prisma.$queryRaw`
      select count(*) from EventTransaction et
      join Transaction t on t.transactionid = et.transaction_id
      where et.event_id= ${eventid}
      `;

      const countTransactionByeventname = await prisma.$queryRaw`
      select count(*) from EventTransaction et
      join Transaction t on t.transactionid = et.transaction_id
      where et.event_id= ${eventid}
      `;

      console.log(countTransactionByeventid);

      res.send({
        success: true,
        result: countTransactionByeventid,
      });
    } catch (error) {
      next(error);
    }
  },

  //totaltransaction&event
  // async sumDataTransactionbyEvent(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const totalTransaction = await prisma.transaction.aggregate({
  //       _sum: {
  //         totalprice: true,
  //       },
  //       _when: {
  //           eventtransaction: {
  //             event_id: {
  //             eventname,
  //             },
  //           } ,
  //       }
  //     });
  //     res.send({
  //       success: true,
  //       result: totalTransaction,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};

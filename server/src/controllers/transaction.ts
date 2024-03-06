import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

//create transaction
export const transactionController = {
  async getTransaction(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const transaction = await prisma.transaction.findMany({
        include: {
          user: true,
          voucher: {
            select: {
              vouchername: true,
            },
          },
          event: {
            select: {
              eventname: true,
            },
          },
        },
        where: {
          user_id: req.user?.userid,
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
        event_id,
        user_id,
        voucher_id,
      } = req.body;

      const newTransaction: Prisma.TransactionCreateInput = {
        qty,
        subtotalprice,
        discountprice,
        totalprice,
        event: { connect: { eventid: event_id } },

        user: { connect: { userid: user_id } },
        // userid: Number(user_id),
        // ...whereVoucher
        voucher: voucher_id
          ? {
              connect: {
                voucherid: voucher_id,
              },
            }
          : {},
      };

      const newTs = await prisma.transaction.create({
        data: newTransaction,
      });

      // console.log(eventtransaction, " ini evtr");

      // const eventtransactionInsert = eventtransaction.map((eventId: number) => {
      //   return {
      //     transaction_id: newTs.transactionid,
      //     event_id: eventId,
      //   };
      // });

      // console.log(eventtransactionInsert, "testing eventr");

      // const et = await prisma.eventTransaction.createMany({
      //   data: eventtransactionInsert,
      // });

      // console.log(et);

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
      select * from EventTransaction et
      join Transaction t on t.transactionid = et.transaction_id
      where et.event_id= ${eventid}
      `;

      console.log(countTransactionByeventid);

      res.send({
        success: true,
        result: countTransactionByeventid,
        message: "get countdata transaction",
      });
    } catch (error) {
      next(error);
    }
  },
};

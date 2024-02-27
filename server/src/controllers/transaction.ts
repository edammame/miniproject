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
        transactionid,
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

      await prisma.transaction.create({
        data: newTransaction,
      });

      res.send({
        success: true,
        message: "transaction post successfully",
      });
    } catch (error) {
      console.log(error);

      next({ message: "failed to post transaction" });
    }
  },
};

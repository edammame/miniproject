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
};

import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

//create promotion
export const voucherController = {
  async getVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const { vouchername } = req.query;
      const voucher = await prisma.voucher.findMany({
        // include: {
        //   user: {
        //     select: {
        //       userid: true,
        //       email: true,
        //       username: true,
        //     },
        //   },
        // },
        where: {
          vouchername: {
            contains: String(vouchername),
          },
        },
      });
      res.send({
        success: true,
        result: voucher,
      });
    } catch (error) {
      next(error);
    }
  },

  async postVoucher(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const {
        vouchername,
        voucherpromodesc,
        discount,
        voucherstartdate,
        voucherenddate,
        stock,
      } = req.body;

      const newVoucher: Prisma.VoucherCreateInput = {
        vouchername,
        voucherpromodesc,
        discount,
        voucherstartdate,
        voucherenddate,
        stock,
      };

      await prisma.voucher.create({
        data: newVoucher,
      });

      res.send({
        success: true,
        message: "voucher created successfully",
      });
    } catch (error) {
      next({ message: "failed to create voucher" });
    }
  },
};

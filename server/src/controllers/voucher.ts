import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

//create promotion
export const voucherController = {
  async getVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const { vouchername, voucherid } = req.query;
      const voucher = await prisma.voucher.findMany({
        where: {
          OR: [
            { vouchername: { contains: String(vouchername).toLowerCase() } },
            { voucherid: { contains: String(voucherid).toLowerCase() } },
          ],
        },
      });
      console.log(voucher);
      res.send({
        success: true,
        result: voucher,
      });
    } catch (error) {
      next(error);
    }
  },

  async postVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        vouchername,
        voucherpromodesc,
        discount,
        voucherstartdate,
        voucherenddate,
        stock,
      } = req.body;
      console.log(req.body);

      const newVoucher: Prisma.VoucherCreateInput = {
        vouchername,
        voucherpromodesc,
        discount,
        voucherstartdate: new Date(voucherstartdate),
        voucherenddate: new Date(voucherenddate),
        stock: Number(stock),
        // voucheruser: {
        //   connect: {
        //     user_id: 1,
        //     // user_id: req.user?.user_id,
        //   },
        // },
      };

      await prisma.voucher.create({
        data: newVoucher,
      });

      res.send({
        success: true,
        message: "voucher created successfully",
      });
    } catch (error) {
      console.log(error);

      next({ message: "failed to create voucher" });
    }
  },

  async deleteVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.voucher.delete({
        where: {
          voucherid: req.params.voucherid,
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
};

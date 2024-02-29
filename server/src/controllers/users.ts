import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from ".."; //accessing model
import { Prisma } from "@prisma/client"; // accessing interface/types
import { ReqUser } from "../middlewares/auth-middleware";
import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { mailer } from "../lib/nodemailer";
import mustache from "mustache";
import fs from "fs";

type TUser = {
  username: string;
  email: string;
  password: string;
};

const template = fs
  .readFileSync(__dirname + "/../templates/verify.html")
  .toString();

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username, role } = req.body;
      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UserCreateInput = {
        username,
        email,
        password: hashedPassword,
        role,
      };

      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkUser?.userid) throw Error("user sudah terdaftar");

      await prisma.user.create({
        data: newUser,
      });

      const token = sign({ email }, secretKey, {
        expiresIn: "5hr",
      });

      const rendered = mustache.render(template, {
        email,
        fullname: username,
        verify_url: process.env.verifyURL + token,
      });

      mailer({
        to: email,
        subject: "Verify Account",
        text: "",
        html: rendered,
      }).catch((err) => console.log(err));

      res.send({
        success: true,
        message: "berhasil register",
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;

      const user = await prisma.user.findUnique({
        where: {
          email: String(email),
        },
      });
      if (!user) throw Error("email/password salah");
      const checkPassword = await compare(String(password), user.password);
      const resUser = {
        id: user.userid,
        email: user.email,
        role: user.role,
      };
      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "1hr",
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }

      throw Error("email/password tidak sesuai");
    } catch (error) {
      next(error);
    }
  },
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error("unauthorized");

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.user.findUnique({
        select: {
          userid: true,
          email: true,
          role: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error("unauthorized 2");

      const token = sign(checkUser, secretKey, {
        expiresIn: "1hr",
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, fullname } = req.query;

      const rendered = mustache.render(template, {
        email,
        fullname,
        verify_url: "",
      });

      mailer({
        to: String(email),
        subject: "verify account",
        text: "",
        html: rendered,
      });

      res.send({
        message: "email berhasil dikirim",
      });
    } catch (error) {
      next(error);
    }
  },
  async verifyEmail(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      const verif: Prisma.UserUpdateInput = {
        isVerified: true,
      };
      if (user?.isVerified) throw Error("user already verified");
      await prisma.user.update({
        data: verif,
        where: {
          userid: user?.userid,
        },
      });
      console.log("aman");

      res.send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.user.delete({
        where: {
          email: String(req.query.email),
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

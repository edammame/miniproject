import { Response, Request, NextFunction } from "express";

export type TUser = {
  user_id: number;
  username: string;
  email: string;
  role: string;
  rating: number;
};

export interface ReqUser extends Request {
  user?: TUser;
}

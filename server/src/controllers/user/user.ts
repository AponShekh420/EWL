import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

export const userController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("User Controller Response");

  if (true) {
    next(createError(401, "You are not authenticated"));
  }
};

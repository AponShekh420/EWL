import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(createError(404, "requested page not found!"));
};

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || error.status || 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: error?.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

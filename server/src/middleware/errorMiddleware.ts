import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import multer from "multer";

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
  if (error instanceof multer.MulterError) {
    let message = error.message;

    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        message = "File too large";
        break;
      case "LIMIT_FILE_COUNT":
        message = "Too many files uploaded";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = "Unexpected field in form data";
        break;
    }

    return res.status(400).json({
      success: false,
      status: 400,
      message,
    });
  }

  const statusCode = error.statusCode || error.status || 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: error?.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

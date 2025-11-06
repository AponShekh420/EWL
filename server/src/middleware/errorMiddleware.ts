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
  // 🔹 Handle Multer-specific errors first
  if (error instanceof multer.MulterError) {
    let message = "File upload error";

    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        message = "File size too large";
        break;
      case "LIMIT_FILE_COUNT":
        message = "Too many files uploaded";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = "Unexpected file field in form data";
        break;
      default:
        message = error.message;
    }

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message,
      error: {
        name: "MulterError",
        code: error.code,
      },
    });
  }

  // 🔹 General error handling
  const statusCode = error.statusCode || error.status || 500;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message || "Internal Server Error",
    error: {
      name: error.name || "ServerError",
      details: error.details || null,
    },
    ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
  });
};

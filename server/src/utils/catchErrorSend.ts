import { NextFunction } from "express";
import createError from "http-errors";

export const catchErrorSend = (next: NextFunction, error: unknown) => {
  if (error instanceof Error) {
    console.log(error);
    return next(createError(500, error.message));
  } else {
    return next(createError(500, "something went wrong from server"));
  }
};

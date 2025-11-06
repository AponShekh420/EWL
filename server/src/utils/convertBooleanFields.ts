import { NextFunction, Request, Response } from "express";

export const convertBooleanFields =
  (fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        req.body[field] = req.body[field] === "true";
      }
    });
    next();
  };

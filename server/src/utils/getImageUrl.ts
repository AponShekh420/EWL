import { Request } from "express";

export const getImageUrl = (
  req: Request,
  folder: string,
  file: Express.Multer.File
): string => {
  return `${req.protocol}://${req.get("host")}/images/${folder}/${
    file.filename
  }`;
};

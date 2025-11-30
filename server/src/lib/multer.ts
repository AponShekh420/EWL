import { Request } from "express";
import fs from "fs";
import createError from "http-errors";
import multer, { diskStorage } from "multer";
import path from "path";

export const multerUploader = (
  folder: string,
  acceptedFileTypes: string[] = ["image/jpeg", "image/png", "image/webp"], // defaults
  maxFileSize?: number
) => {
  const uploadDir = path.join(process.cwd(), "public/images", folder);
  // Ensure upload folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: false });
  }

  const storage = diskStorage({
    destination: (_, __, cb) => cb(null, uploadDir),
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "_");
      cb(null, `${baseName}_${Date.now()}${ext}`);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (acceptedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const supported = acceptedFileTypes
        .map((type) => type.replace("image/", ""))
        .join(", ");
      cb(createError(400, `Only ${supported} format(s) supported`));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: maxFileSize ? { fileSize: maxFileSize } : undefined, // limit only if provided
  });
};

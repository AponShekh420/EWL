import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import classModel from "../../../models/ClassModel";

export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Class ID is required"));

    const deletedClass = await classModel.findByIdAndDelete(id);
    if (!deletedClass) {
      return next(createError(404, `Class with id ${id} not found`));
    }

    deleteFileFromLocal(
      [
        deletedClass?.audiosOne,
        deletedClass?.audiosTwo,
        deletedClass?.videosOne,
        deletedClass?.videosTwo,
        deletedClass.thumbnail,
        deletedClass?.attachment,
      ].filter((file): file is string => Boolean(file)),
      "classes"
    );
    
    return res.status(200).json({
      success: true,
      status: 201,
      data: deletedClass,
      message: `Class with id ${id} deleted successfully`,
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};

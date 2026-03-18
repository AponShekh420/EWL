import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { deleteFileFromLocal } from "../../../utils/deleteFileFromLocal";
import { getFilterBodyData } from "../../../utils/getFilterBodyData";

type MulterFile = Record<string, Express.Multer.File[]>;

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    if (!id) return next(createError(400, "Product ID is required"));

    const { images, thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterBodyData(req);
    const deletedImages: string[] = body.deletedImages
      ? JSON.parse(body.deletedImages)
      : [];

    // Find old product
    const oldProduct = await productModel.findById(id);
    if (!oldProduct) return next(createError(404, "Product not found"));

    let slug;
    let metaSlug;
    // If the title hasn't changed, keep the current slug
    if (body.title === oldProduct.title && oldProduct?.slug == body.slug) {
      slug = oldProduct.slug;
    } else {
      // Remove special characters and generate slug
      const sanitizedTitle = body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "");

      slug = sanitizedTitle.split(" ").join("-");

      // Check for duplicates excluding the current communtiy ID
      const duplicateProductCount = await productModel.countDocuments({
        slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        _id: { $ne: oldProduct._id },
      });

      if (duplicateProductCount > 0) {
        slug = `${slug}-${duplicateProductCount}`;
      }
    }
    // If the title hasn't changed, keep the current metaSlug

    if (
      body.metaTitle === oldProduct.metaTitle &&
      oldProduct?.metaSlug == body.metaSlug
    ) {
      metaSlug = oldProduct.metaSlug;
      console.log(body.metaTitle, "old");
    } else {
      console.log(body.metaTitle);
      // Remove special characters and generate slug
      const sanitizedTitle = body.metaTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "");

      metaSlug = sanitizedTitle.split(" ").join("-");

      // Check for duplicates excluding the current communtiy ID
      const duplicateProductCount = await productModel.countDocuments({
        metaSlug: { $regex: `^${metaSlug}(-[0-9]*)?$`, $options: "i" },
        _id: { $ne: oldProduct._id },
      });

      if (duplicateProductCount > 0) {
        metaSlug = `${metaSlug}-${duplicateProductCount}`;
      }
    }

    const updatedData: Record<string, any> = { ...body, slug, metaSlug };

    // ---- IMAGES ----
    if (images?.length) {
      const newImages = images.map((file) => file.filename);

      updatedData.images = [
        ...oldProduct.images.filter((img) => !deletedImages.includes(img)),
        ...newImages,
      ];
    }

    // ---- THUMBNAIL ----
    if (thumbnail?.length) {
      updatedData.thumbnail = thumbnail[0].filename;
    }

    // ---- ATTACHMENT ----
    if (attachment?.length) {
      updatedData.attachment = attachment[0].filename;
    }

    // ---- UPDATE PRODUCT ----
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedProduct)
      return next(createError(400, "Failed to update product"));

    // ---- DELETE OLD FILES ----
    const allOldFiles = [
      ...(oldProduct.images || []),
      oldProduct.thumbnail,
      oldProduct.attachment,
    ].filter(Boolean);

    deletedImages.forEach((img) => {
      if (allOldFiles.includes(img)) {
        deleteFileFromLocal(img, "products");
      }
    });
    if (body.category !== oldProduct.category) {
      await CategoryModel.updateOne(
        { products: oldProduct._id },
        { $pull: { products: oldProduct._id } },
      );
      await CategoryModel.updateOne(
        { name: body.category },
        { $addToSet: { products: oldProduct._id } },
      );
    }

    // ---- RESPONSE ----
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    catchErrorSend(next, error);
  }
};

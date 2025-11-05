import { Router } from "express";
import { createProduct } from "../controllers/ecommerce/product/createProduct";
import { deleteProduct } from "../controllers/ecommerce/product/deleteProduct";
import { multerUploader } from "../lib/multer";
const router = Router();
const multiFileUploader = multerUploader("/images/products");
/* 
Developed by:Shipon islam 
Date: 31-10-2025
*/
router.post(
  "/product",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "images" },
  ]),
  createProduct
);
router.delete("/product/:id", deleteProduct);

export default router;

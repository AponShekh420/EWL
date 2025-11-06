import { Router } from "express";
import { createProduct } from "../controllers/ecommerce/product/createProduct";
import { deleteProduct } from "../controllers/ecommerce/product/deleteProduct";
import { getAllProduct } from "../controllers/ecommerce/product/getAllProduct";
import { getProductById } from "../controllers/ecommerce/product/getProductById";
import { updateProduct } from "../controllers/ecommerce/product/updateProduct";
import { multerUploader } from "../lib/multer";
import {
  productValidationRules,
  validateProduct,
} from "../middleware/product/productValidator";
import { convertBooleanFields } from "../utils/convertBooleanFields";
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
  convertBooleanFields([
    "isVisibleProductPage",
    "trackStockQuantity",
    "limitOneItemPerOrder",
    "enelope",
  ]),
  productValidationRules,
  validateProduct,
  createProduct
);
router.put(
  "/product/:id",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "images" },
  ]),
  updateProduct
);
router.delete("/product/:id", deleteProduct);
router.get("/product/:id", getProductById);
router.get("/products", getAllProduct);

export default router;

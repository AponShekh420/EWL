import { Router } from "express";
import { createCategory } from "../controllers/ecommerce/category/createCategory";
import { deleteCategory } from "../controllers/ecommerce/category/deleteCategory";
import { getAllCategories } from "../controllers/ecommerce/category/getAllCategories";
import { createSubCategory } from "../controllers/ecommerce/category/sub-category/createSubCategory";
import { deleteSubcategory } from "../controllers/ecommerce/category/sub-category/deleteSubcategory";
import { getSubAllCategories } from "../controllers/ecommerce/category/sub-category/getSubAllCategories";

import { updateSubcategory } from "../controllers/ecommerce/category/sub-category/updateSubCategory";
import { updateCategory } from "../controllers/ecommerce/category/updateCategory";
import { createProduct } from "../controllers/ecommerce/product/createProduct";
import { deleteProduct } from "../controllers/ecommerce/product/deleteProduct";
import { getAllProduct } from "../controllers/ecommerce/product/getAllProduct";
import { getProductById } from "../controllers/ecommerce/product/getProductById";
import { updateProduct } from "../controllers/ecommerce/product/updateProduct";
import { multerUploader } from "../lib/multer";
import {
  categoryValidationRules,
  validateCategory,
} from "../middleware/category/categoryValidator";
import {
  subcategoryValidationRules,
  validateSubcategory,
} from "../middleware/category/subcategoryValidator";
import {
  productValidationRules,
  validateProduct,
} from "../middleware/product/productValidator";
import { convertBooleanFields } from "../utils/convertBooleanFields";
const router = Router();

const multiFileUploader = multerUploader("products");
const singleFileUploader = multerUploader("category");
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

//category routes
router.post(
  "/category",
  singleFileUploader.single("image"),
  categoryValidationRules,
  validateCategory,
  createCategory
);
router.put(
  "/categories/:id",
  singleFileUploader.single("image"),
  updateCategory
);
router.delete("/categories/:id", deleteCategory);
router.get("/categories", getAllCategories);

//subcategory routes
router.post(
  "/subcategory",
  singleFileUploader.single("image"),
  subcategoryValidationRules,
  validateSubcategory,
  createSubCategory
);
router.put(
  "/subcategories/:id",
  singleFileUploader.single("image"),
  updateSubcategory
);
router.delete("/subcategories/:id", deleteSubcategory);

router.get("/subcategories", getSubAllCategories);

export default router;

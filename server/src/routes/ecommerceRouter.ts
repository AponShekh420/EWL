import { Router } from "express";
import { createCategory } from "../controllers/ecommerce/category/createCategory";
import { deleteCategory } from "../controllers/ecommerce/category/deleteCategory";
import { getAllCategories } from "../controllers/ecommerce/category/getAllCategories";
import { createSubCategory } from "../controllers/ecommerce/category/sub-category/createSubCategory";
import { deleteSubcategory } from "../controllers/ecommerce/category/sub-category/deleteSubcategory";
import { getSubAllCategories } from "../controllers/ecommerce/category/sub-category/getSubAllCategories";

import { updateSubcategory } from "../controllers/ecommerce/category/sub-category/updateSubCategory";
import { updateCategory } from "../controllers/ecommerce/category/updateCategory";

import { createCart } from "../controllers/ecommerce/cart/createCart";
import { deleteCart } from "../controllers/ecommerce/cart/deleteCart";
import { getAllCart } from "../controllers/ecommerce/cart/getAllCart";
import { updateCart } from "../controllers/ecommerce/cart/updateCart";
import { createOrder } from "../controllers/ecommerce/order/createOrder";
import { deleteOrder } from "../controllers/ecommerce/order/deleteOrder";
import { getAllOrder } from "../controllers/ecommerce/order/getAllOrders";
import { getOrderById } from "../controllers/ecommerce/order/getOrderById";
import { updateOrder } from "../controllers/ecommerce/order/updateOrder";
import { createProduct } from "../controllers/ecommerce/product/createProduct";
import { deleteProduct } from "../controllers/ecommerce/product/deleteProduct";
import { getAllProduct } from "../controllers/ecommerce/product/getAllProduct";
import { getProductById } from "../controllers/ecommerce/product/getProductById";
import { updateProduct } from "../controllers/ecommerce/product/updateProduct";
import { createReview } from "../controllers/ecommerce/review/createReview";
import { deleteReview } from "../controllers/ecommerce/review/deleteReview";

import { getCategoriesByFilters } from "../controllers/ecommerce/category/getCategoriesByFilters";
import { getCategoryById } from "../controllers/ecommerce/category/getCategoryById";
import { getProductByFilter } from "../controllers/ecommerce/product/getProductByFilter";
import { updateProductStatus } from "../controllers/ecommerce/product/updateProductStatus";
import { getAllReview } from "../controllers/ecommerce/review/getAllReview";
import { getAllReviewByProductId } from "../controllers/ecommerce/review/getAllReviewByProductId";
import { updateReview } from "../controllers/ecommerce/review/updateReview";
import { multerUploader } from "../lib/multer";
import {
  cartValidationRules,
  validateCart,
} from "../middleware/carts/cartMiddleware";
import {
  categoryValidationRules,
  validateCategory,
} from "../middleware/category/categoryValidator";
import {
  subcategoryValidationRules,
  validateSubcategory,
} from "../middleware/category/subcategoryValidator";
import {
  orderValidationRules,
  validateOrder,
} from "../middleware/order/orderMiddleware";
import {
  productValidationRules,
  validateProduct,
  validateUpdateProduct,
} from "../middleware/product/productValidator";
import {
  reviewUpdateValidationRules,
  reviewValidationRules,
  validateReview,
} from "../middleware/review/reviewMiddleware";
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

  productValidationRules,
  validateProduct,
  createProduct
);
router.put(
  "/products/:id",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "images" },
  ]),
  productValidationRules,
  validateUpdateProduct,
  updateProduct
);
router.put("/product-status/:id", updateProductStatus);
router.delete("/products/:id", deleteProduct);
router.get("/products/:id", getProductById);
router.get("/products", getAllProduct);
router.get("/product-by-filter", getProductByFilter);
//order routes
router.post("/order", orderValidationRules, validateOrder, createOrder);
router.put("/orders/:id", orderValidationRules, validateOrder, updateOrder);
router.put("/order-status/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);
router.get("/orders/:id", getOrderById);
router.get("/orders", getAllOrder);

//cart routes
router.post("/cart", cartValidationRules, validateCart, createCart);
router.put("/carts/:id", cartValidationRules, validateCart, updateCart);
router.delete("/carts/:id", deleteCart);
router.get("/carts", getAllCart);

//review routes
router.post("/review", reviewValidationRules, validateReview, createReview);
router.put(
  "/reviews/:id",
  reviewUpdateValidationRules,
  validateReview,
  updateReview
);
router.delete("/reviews/:id", deleteReview);
router.get("/reviews", getAllReview);
router.get("/reviews/:productId", getAllReviewByProductId);

//category routes
router.post(
  "/category",
  singleFileUploader.single("thumbnail"),
  categoryValidationRules,
  validateCategory,
  createCategory
);
router.put(
  "/categories/:id",
  singleFileUploader.single("thumbnail"),
  updateCategory
);
router.delete("/categories/:id", deleteCategory);
router.get("/categories/:id", getCategoryById);
router.get("/categories", getAllCategories);
router.get("/categories-by-filter", getCategoriesByFilters);

//subcategory routes
router.post(
  "/subcategory",
  singleFileUploader.single("thumbnail"),
  subcategoryValidationRules,
  validateSubcategory,
  createSubCategory
);
router.get("/subcategories/:id", getCategoryById);
router.put(
  "/subcategories/:id",
  singleFileUploader.single("thumbnail"),
  updateSubcategory
);
router.delete("/subcategories/:id", deleteSubcategory);

router.get("/subcategories", getSubAllCategories);

export default router;

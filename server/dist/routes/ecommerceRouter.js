"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createCategory_1 = require("../controllers/ecommerce/category/createCategory");
const deleteCategory_1 = require("../controllers/ecommerce/category/deleteCategory");
const getAllCategories_1 = require("../controllers/ecommerce/category/getAllCategories");
const createSubCategory_1 = require("../controllers/ecommerce/category/sub-category/createSubCategory");
const deleteSubcategory_1 = require("../controllers/ecommerce/category/sub-category/deleteSubcategory");
const getSubAllCategories_1 = require("../controllers/ecommerce/category/sub-category/getSubAllCategories");
const updateSubCategory_1 = require("../controllers/ecommerce/category/sub-category/updateSubCategory");
const updateCategory_1 = require("../controllers/ecommerce/category/updateCategory");
const addToCart_1 = require("../controllers/ecommerce/cart/addToCart");
const deleteCart_1 = require("../controllers/ecommerce/cart/deleteCart");
const getAllCart_1 = require("../controllers/ecommerce/cart/getAllCart");
const updateCart_1 = require("../controllers/ecommerce/cart/updateCart");
const createOrder_1 = __importDefault(require("../controllers/ecommerce/order/createOrder"));
const deleteOrder_1 = require("../controllers/ecommerce/order/deleteOrder");
const getAllOrders_1 = require("../controllers/ecommerce/order/getAllOrders");
const getOrderById_1 = require("../controllers/ecommerce/order/getOrderById");
const updateOrder_1 = require("../controllers/ecommerce/order/updateOrder");
const createProduct_1 = require("../controllers/ecommerce/product/createProduct");
const deleteProduct_1 = require("../controllers/ecommerce/product/deleteProduct");
const getAllProduct_1 = require("../controllers/ecommerce/product/getAllProduct");
const getProductById_1 = require("../controllers/ecommerce/product/getProductById");
const updateProduct_1 = require("../controllers/ecommerce/product/updateProduct");
const createReview_1 = require("../controllers/ecommerce/review/createReview");
const deleteReview_1 = require("../controllers/ecommerce/review/deleteReview");
const getCategoriesByFilters_1 = require("../controllers/ecommerce/category/getCategoriesByFilters");
const getCategoryBySlug_1 = require("../controllers/ecommerce/category/getCategoryBySlug");
const getSubCategoryById_1 = require("../controllers/ecommerce/category/sub-category/getSubCategoryById");
const getProductByFilter_1 = require("../controllers/ecommerce/product/getProductByFilter");
const updateProductStatus_1 = require("../controllers/ecommerce/product/updateProductStatus");
const getAllReview_1 = require("../controllers/ecommerce/review/getAllReview");
const getAllReviewByProductId_1 = require("../controllers/ecommerce/review/getAllReviewByProductId");
const updateReview_1 = require("../controllers/ecommerce/review/updateReview");
const createShipping_1 = require("../controllers/ecommerce/shipping/createShipping");
const deleteShipping_1 = require("../controllers/ecommerce/shipping/deleteShipping");
const getAllShipping_1 = require("../controllers/ecommerce/shipping/getAllShipping");
const getShippingById_1 = require("../controllers/ecommerce/shipping/getShippingById");
const updateShipping_1 = require("../controllers/ecommerce/shipping/updateShipping");
const addToWishlist_1 = require("../controllers/ecommerce/wishlist/addToWishlist");
const deleteWishlist_1 = require("../controllers/ecommerce/wishlist/deleteWishlist");
const getAllWishlist_1 = require("../controllers/ecommerce/wishlist/getAllWishlist");
const multer_1 = require("../lib/multer");
const categoryValidator_1 = require("../middleware/category/categoryValidator");
const subcategoryValidator_1 = require("../middleware/category/subcategoryValidator");
const authCheck_1 = __importDefault(require("../middleware/common/authCheck"));
const orderMiddleware_1 = require("../middleware/order/orderMiddleware");
const productValidator_1 = require("../middleware/product/productValidator");
const reviewMiddleware_1 = require("../middleware/review/reviewMiddleware");
const shippingMiddleware_1 = require("../middleware/shipping/shippingMiddleware");
const router = (0, express_1.Router)();
const multiFileUploader = (0, multer_1.multerUploader)("products");
const singleFileUploader = (0, multer_1.multerUploader)("category");
const getTaxAndShipping_1 = require("../controllers/ecommerce/cart/getTaxAndShipping");
const shipping_1 = __importDefault(require("../middleware/shipping/shipping"));
const createBox_1 = __importDefault(require("../controllers/ecommerce/usps/createBox"));
const shippingClassRulseHandler_1 = __importDefault(require("../helpers/shippingClassRulseHandler"));
const getBoxes_1 = require("../controllers/ecommerce/usps/getBoxes");
const orderSuccess_1 = __importDefault(require("../controllers/ecommerce/order/orderSuccess"));
const express_2 = __importDefault(require("express"));
const deleteCartItems_1 = require("../controllers/ecommerce/cart/deleteCartItems");
const getPrivateOrderById_1 = require("../controllers/ecommerce/order/getPrivateOrderById");
const getAllPrivateOrders_1 = require("../controllers/ecommerce/order/getAllPrivateOrders");
/*
Developed by:Shipon islam
Date: 31-10-2025
*/
router.post("/product", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "images" },
]), productValidator_1.productValidationRules, productValidator_1.validateProduct, createProduct_1.createProduct);
router.put("/products/:id", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
    { name: "images" },
]), productValidator_1.productValidationRules, productValidator_1.validateUpdateProduct, updateProduct_1.updateProduct);
router.put("/product-status/:id", updateProductStatus_1.updateProductStatus);
router.delete("/products/:id", deleteProduct_1.deleteProduct);
router.get("/products/:slug", getProductById_1.getProductBySlug);
router.get("/products", getAllProduct_1.getAllProduct);
router.get("/product-by-filter", getProductByFilter_1.getProductByFilter);
//order routes
router.post("/order/create-order", authCheck_1.default, orderMiddleware_1.orderValidationRules, orderMiddleware_1.validateOrder, createOrder_1.default);
router.post("/order/webhook", express_2.default.raw({ type: "application/json" }), orderSuccess_1.default);
router.put("/orders/:id", orderMiddleware_1.orderValidationRules, orderMiddleware_1.validateOrder, updateOrder_1.updateOrder);
router.put("/order-status/:id", updateOrder_1.updateOrder);
router.delete("/orders/:id", deleteOrder_1.deleteOrder);
router.get("/orders/:id", getOrderById_1.getOrderById);
router.get("/orders", getAllOrders_1.getAllOrder);
// private orders
router.get("/my-orders/:id", authCheck_1.default, getPrivateOrderById_1.getPrivateOrderById);
router.get("/my-orders", authCheck_1.default, getAllPrivateOrders_1.getAllPrivateOrder);
//cart routes
router.post("/cart", authCheck_1.default, addToCart_1.addToCart);
router.put("/cart/:productId", authCheck_1.default, updateCart_1.updateCart);
router.delete("/cart/:productId", authCheck_1.default, deleteCart_1.deleteCart);
router.delete("/carts/items", authCheck_1.default, deleteCartItems_1.deleteCartItems);
router.get("/cart-list", authCheck_1.default, getAllCart_1.getAllCart);
// cart tax and shipping calculation route
router.post("/cart/tax-shipping", shippingClassRulseHandler_1.default, shipping_1.default, getTaxAndShipping_1.getTaxAndShipping);
router.put("/usps/boxes/bulk-update", createBox_1.default);
router.get("/usps/boxes", getBoxes_1.getBoxes);
//cart routes
router.post("/wishlist", authCheck_1.default, addToWishlist_1.addToWishlist);
router.delete("/wishlist/:productId", authCheck_1.default, deleteWishlist_1.deleteWishlist);
router.get("/wishlist", authCheck_1.default, getAllWishlist_1.getAllWishlist);
//review routes
router.post("/review", authCheck_1.default, reviewMiddleware_1.reviewValidationRules, reviewMiddleware_1.validateReview, createReview_1.createReview);
router.put("/reviews/:id", reviewMiddleware_1.reviewUpdateValidationRules, reviewMiddleware_1.validateReview, updateReview_1.updateReview);
router.delete("/reviews/:id", deleteReview_1.deleteReview);
router.get("/reviews", getAllReview_1.getAllReview);
router.get("/reviews/:productId", getAllReviewByProductId_1.getAllReviewByProductId);
//category routes
router.post("/category", singleFileUploader.single("thumbnail"), categoryValidator_1.categoryValidationRules, categoryValidator_1.validateCategory, createCategory_1.createCategory);
router.put("/categories/:id", singleFileUploader.single("thumbnail"), updateCategory_1.updateCategory);
router.delete("/categories/:id", deleteCategory_1.deleteCategory);
router.get("/categories/:slug", getCategoryBySlug_1.getCategoryBySlug);
router.get("/categories", getAllCategories_1.getAllCategories);
router.get("/categories-by-filter", getCategoriesByFilters_1.getCategoriesByFilters);
//subcategory routes
router.post("/subcategory", singleFileUploader.single("thumbnail"), subcategoryValidator_1.subcategoryValidationRules, subcategoryValidator_1.validateSubcategory, createSubCategory_1.createSubCategory);
router.get("/subcategories/:id", getSubCategoryById_1.getSubCategoryById);
router.put("/subcategories/:id", singleFileUploader.single("thumbnail"), updateSubCategory_1.updateSubcategory);
router.delete("/subcategories/:id", deleteSubcategory_1.deleteSubcategory);
router.get("/subcategories", getSubAllCategories_1.getSubAllCategories);
//for shipping routes, you can add them here in the future
router.post("/shipping", authCheck_1.default, shippingMiddleware_1.shippingValidationRules, shippingMiddleware_1.validateShipping, createShipping_1.createShipping);
router.put("/shipping/:id", authCheck_1.default, shippingMiddleware_1.shippingValidationRules, shippingMiddleware_1.validateShipping, updateShipping_1.updateShipping);
router.delete("/shipping/:id", deleteShipping_1.deleteShipping);
router.get("/shipping/:id", getShippingById_1.getShippingById);
router.get("/shipping", getAllShipping_1.getAllShipping);
// export product
// router.post("/products/export", exportProducts);
exports.default = router;

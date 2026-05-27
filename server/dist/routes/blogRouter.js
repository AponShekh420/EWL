"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../lib/multer");
const blogCategoryValidator_1 = require("../middleware/blog-category/blogCategoryValidator");
const createBlogCategory_1 = require("../controllers/blog/category/createBlogCategory");
const getBlogCategoriesByFilters_1 = require("../controllers/blog/category/getBlogCategoriesByFilters");
const getAllBlogCategories_1 = require("../controllers/blog/category/getAllBlogCategories");
const getBlogCategoryBySlug_1 = require("../controllers/blog/category/getBlogCategoryBySlug");
const deleteBlogCategory_1 = require("../controllers/blog/category/deleteBlogCategory");
const updateBlogCategory_1 = require("../controllers/blog/category/updateBlogCategory");
const createBlog_1 = require("../controllers/blog/blog/createBlog");
const updateBlog_1 = require("../controllers/blog/blog/updateBlog");
const updateBlogStatus_1 = require("../controllers/blog/blog/updateBlogStatus");
const deleteBlog_1 = require("../controllers/blog/blog/deleteBlog");
const getBlogBySlug_1 = require("../controllers/blog/blog/getBlogBySlug");
const getAllBlogs_1 = require("../controllers/blog/blog/getAllBlogs");
const getBlogsByFilter_1 = require("../controllers/blog/blog/getBlogsByFilter");
const blogValidator_1 = require("../middleware/blog/blogValidator");
const router = (0, express_1.Router)();
const multiFileUploader = (0, multer_1.multerUploader)("blogs");
const singleFileUploader = (0, multer_1.multerUploader)("blog-category");
// blog routes
router.post("/blog", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
]), blogValidator_1.blogValidationRules, blogValidator_1.validateBlog, createBlog_1.createBlog);
router.put("/blog/:id", multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
]), blogValidator_1.blogValidationRules, blogValidator_1.validateUpdateBlog, updateBlog_1.updateBlog);
router.put("/blog-status/:id", updateBlogStatus_1.updateBlogStatus);
router.delete("/blog/:id", deleteBlog_1.deleteBlog);
router.get("/blog/:slug", getBlogBySlug_1.getBlogBySlug);
router.get("/blogs", getAllBlogs_1.getAllBlogs);
router.get("/blogs-by-filter", getBlogsByFilter_1.getBlogsByFilter);
//category routes
router.post("/category", singleFileUploader.single("thumbnail"), blogCategoryValidator_1.blogCategoryValidationRules, blogCategoryValidator_1.validateBlogCategory, createBlogCategory_1.createBlogCategory);
router.put("/categories/:id", singleFileUploader.single("thumbnail"), updateBlogCategory_1.updateBlogCategory);
router.delete("/categories/:id", deleteBlogCategory_1.deleteBlogCategory);
router.get("/categories/:slug", getBlogCategoryBySlug_1.getBlogCategoryBySlug);
router.get("/categories", getAllBlogCategories_1.getAllBlogCategories);
router.get("/categories-by-filter", getBlogCategoriesByFilters_1.getBlogCategoriesByFilters);
exports.default = router;

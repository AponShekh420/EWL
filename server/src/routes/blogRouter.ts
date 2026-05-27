import { Router } from "express";
import { multerUploader } from "../lib/multer";
import { blogCategoryValidationRules, validateBlogCategory } from "../middleware/blog-category/blogCategoryValidator";
import { createBlogCategory } from "../controllers/blog/category/createBlogCategory";
import { getBlogCategoriesByFilters } from "../controllers/blog/category/getBlogCategoriesByFilters";
import { getAllBlogCategories } from "../controllers/blog/category/getAllBlogCategories";
import { getBlogCategoryBySlug } from "../controllers/blog/category/getBlogCategoryBySlug";
import { deleteBlogCategory } from "../controllers/blog/category/deleteBlogCategory";
import { updateBlogCategory } from "../controllers/blog/category/updateBlogCategory";
import { createBlog } from "../controllers/blog/blog/createBlog";
import { updateBlog } from "../controllers/blog/blog/updateBlog";
import { updateBlogStatus } from "../controllers/blog/blog/updateBlogStatus";
import { deleteBlog } from "../controllers/blog/blog/deleteBlog";
import { getBlogBySlug } from "../controllers/blog/blog/getBlogBySlug";
import { getAllBlogs } from "../controllers/blog/blog/getAllBlogs";
import { getBlogsByFilter } from "../controllers/blog/blog/getBlogsByFilter";
import { blogValidationRules, validateBlog, validateUpdateBlog } from "../middleware/blog/blogValidator";
const router = Router();


const multiFileUploader = multerUploader("blogs");
const singleFileUploader = multerUploader("blog-category");


// blog routes
router.post(
  "/blog",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),

  blogValidationRules,
  validateBlog,
  createBlog,
);
router.put(
  "/blog/:id",
  multiFileUploader.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  blogValidationRules,
  validateUpdateBlog,
  updateBlog,
);
router.put("/blog-status/:id", updateBlogStatus);
router.delete("/blog/:id", deleteBlog);
router.get("/blog/:slug", getBlogBySlug);
router.get("/blogs", getAllBlogs);
router.get("/blogs-by-filter", getBlogsByFilter);




//category routes
router.post(
  "/category",
  singleFileUploader.single("thumbnail"),
  blogCategoryValidationRules,
  validateBlogCategory,
  createBlogCategory,
);
router.put(
  "/categories/:id",
  singleFileUploader.single("thumbnail"),
  updateBlogCategory,
);
router.delete("/categories/:id", deleteBlogCategory);
router.get("/categories/:slug", getBlogCategoryBySlug);
router.get("/categories", getAllBlogCategories);
router.get("/categories-by-filter", getBlogCategoriesByFilters);


export default router;
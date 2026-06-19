import { Router } from "express";
import { createResourceCategory } from "../controllers/resources/category/createResourceCategory";
import { deleteResourceCategory } from "../controllers/resources/category/deleteResourceCategory";
import { getAllResourceCategories } from "../controllers/resources/category/getAlResourceCategories";
import { getResourceCategoriesByFilters } from "../controllers/resources/category/getResourceCategoriesByFilters";
import { getResourceCategoryBySlug } from "../controllers/resources/category/getResourceCategoryBySlug";
import { updateResourceCategory } from "../controllers/resources/category/updateResourceCategory";
import { createResources } from "../controllers/resources/resources/createResources";
import { deleteResources } from "../controllers/resources/resources/deleteResources";
import { getAllResources } from "../controllers/resources/resources/getAllResources";
import { getResourcesByFilter } from "../controllers/resources/resources/getResourcesByFilter";
import { getResourcesBySlug } from "../controllers/resources/resources/getResourcesBySlug";
import { updateResources } from "../controllers/resources/resources/updateResources";
import { updateResourcesStatus } from "../controllers/resources/resources/updateResourcesStatus";
import { multerUploader } from "../lib/multer";
import {
  resourcesCategoryValidationRules,
  validateResourcesCategory,
} from "../middleware/resources/resourcesCategoryValidator";
import {
  resourcesValidationRules,
  validateResources,
  validateUpdateResources,
} from "../middleware/resources/resourcesValidator";
const router = Router();

const multiFileUploader = multerUploader("resources");
const singleFileUploader = multerUploader("resources-category");

// Resources routes
router.post(
  "/resources",
  multiFileUploader.fields([{ name: "thumbnail", maxCount: 1 }]),

  resourcesValidationRules,
  validateResources,
  createResources,
);
router.put(
  "/resources/:id",
  multiFileUploader.fields([{ name: "thumbnail", maxCount: 1 }]),
  resourcesValidationRules,
  validateUpdateResources,
  updateResources,
);
router.put("/resources-status/:id", updateResourcesStatus);
router.delete("/resources/:id", deleteResources);
router.get("/resources/:slug", getResourcesBySlug);
router.get("/resources", getAllResources);
router.get("/resources-by-filter", getResourcesByFilter);

//category routes
router.post(
  "/category",
  singleFileUploader.single("thumbnail"),
  resourcesCategoryValidationRules,
  validateResourcesCategory,
  createResourceCategory,
);
router.put(
  "/categories/:id",
  singleFileUploader.single("thumbnail"),
  updateResourceCategory,
);
router.delete("/categories/:id", deleteResourceCategory);
router.get("/categories/:slug", getResourceCategoryBySlug);
router.get("/categories", getAllResourceCategories);
router.get("/categories-by-filter", getResourceCategoriesByFilters);

export default router;

export type BlogCategoryType = {
  _id: string;
  thumbnail: string;
  name: string;
  slug: string;
  description: string;
  blogs: string[];
};

type BlogCategoryValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};

export type BlogCategoryValidationErrors = {
  name?: BlogCategoryValidationErrorItem;
  description?: BlogCategoryValidationErrorItem;
  categoryId?: BlogCategoryValidationErrorItem;
  thumbnail?: BlogCategoryValidationErrorItem;
};

export type CategoryType = {
  _id: string;
  thumbnail: string;
  name: string;
  slug: string;
  description: string;
  products: string[];
};

type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};

export type CategoryValidationErrors = {
  name?: ValidationErrorItem;
  description?: ValidationErrorItem;
  categoryId?: ValidationErrorItem;
  thumbnail?: ValidationErrorItem;
};

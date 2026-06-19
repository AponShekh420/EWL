export type ResourcesType = {
  _id: string;
  title: string;
  link: string;
  category: string;
  thumbnail: string;
  status: string;
  slug: string;
  description: string;
};
export type ResourcesCategoryType = {
  _id: string;
  thumbnail: string;
  name: string;
  slug: string;
  description: string;
  resources: string[];
};
export type ResourcesFormState = {
  // 1st tab
  title: string;
  link: string;
  category: string;
  slug: string;
  description: string;
  // 2nd tab
  thumbnail: File | null;
  existingThumbnail?: string;
  deletedImages?: string[];
};

//blog express validator types errors
type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};

export type BlogValidationErrors = { [key: string]: ValidationErrorItem };

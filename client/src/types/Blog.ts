export type BlogType = {
  _id: string;
  title: string;
  category: string;
  thumbnail: string;
  tags?: string[];
  status: string;
  slug: string;
  description: string;
};

export type BlogFormState = {
  // 1st tab
  title: string;
  category: string;
  slug: string;
  tags: string;
  description: string;

  // 2nd tab
  thumbnail: File | null;
  existingThumbnail?: string;
  existingAttachment?: string;
  deletedImages?: string[];

  // 5th tab
  metaTitle: string;
  metaDescription: string;
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

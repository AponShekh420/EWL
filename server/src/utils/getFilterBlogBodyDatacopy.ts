import { Request } from "express";

export const getFilterBlogBodyData = (req: Request) => {
  const {
    metaTitle,
    metaDescription,
    title,
  } = req.body;

  return {
    ...req.body,
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || title,
  };
};

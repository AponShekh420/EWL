import { Request } from "express";

export const getFilterCourseBodyData = (req: Request) => {
  const {
    metaTitle,
    metaDescription,
    durationType,
    durationNumber,
    title,
    headline,
    bio,
    price,
    offline,
    installmentMonths,
    students,
    module,
  } = req.body;

  return {
    ...req.body,
    price: Number(price),
    students: Number(students) || 0,
    module: Number(module) || 0,
    installmentMonths: Number(installmentMonths) || 0,
    duration: Number(durationNumber) ? `${durationNumber} ${durationType}` : "",
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || (headline || bio),
    offline: offline === "true" ? true : false,
  };
};

"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getCategories = async () => {
  const res = await fetch(BASE_URL + "/api/ecommerce/categories/");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

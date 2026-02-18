"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getCategories = async () => {
  const res = await fetch(BASE_URL + "/api/ecommerce/categories/");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const getCategoryBySlug = async (slug: string) => {
  const res = await fetch(BASE_URL + "/api/ecommerce/categories/" + slug);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const getCategoriesByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/ecommerce/categories-by-filter?" + query,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

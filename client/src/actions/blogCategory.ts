"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getBlogCategories = async () => {
  const res = await fetch(BASE_URL + "/api/blog/categories/", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const getBlogCategoryBySlug = async (slug: string) => {
  const res = await fetch(BASE_URL + "/api/blog/categories/" + slug, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const getBlogCategoriesByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/blog/categories-by-filter?" + query,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

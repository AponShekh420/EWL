"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getResourcesCategories = async () => {
  const res = await fetch(BASE_URL + "/api/resources-management/categories/", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const getResourcesCategoryBySlug = async (slug: string) => {
  const res = await fetch(
    BASE_URL + "/api/resources-management/categories/" + slug,
    {
      cache: "no-store",
    },
  );
  console.log("data");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const getResourcesCategoriesByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/resources-management/categories-by-filter?" + query,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

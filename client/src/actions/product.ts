"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getProductBySlug = async (slug: string) => {
  const res = await fetch(BASE_URL + "/api/ecommerce/products/" + slug);
  if (!res.ok) {
    throw new Error("Failed to fetch product by slug");
  }
  return res.json();
};
export const getProductByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/ecommerce/product-by-filter?" + query,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product by slug");
  }
  return res.json();
};

"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getShippingByQuery = async (query: string) => {
  const res = await fetch(BASE_URL + "/api/ecommerce/shipping?" + query);

  if (!res.ok) {
    throw new Error("Failed to fetch shipping detail");
  }
  return res.json();
};
export const getShippingById = async (id: string) => {
  const res = await fetch(BASE_URL + "/api/ecommerce/shipping/" + id);

  if (!res.ok) {
    throw new Error("Failed to fetch shipping detail");
  }
  return res.json();
};

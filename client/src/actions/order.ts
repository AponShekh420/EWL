"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getOrdersByQuery = async (query: string) => {
  const res = await fetch(BASE_URL + "/api/ecommerce/orders?" + query);

  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};
export const getOrderById = async (id: string) => {
  const res = await fetch(BASE_URL + "/api/ecommerce/orders/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};

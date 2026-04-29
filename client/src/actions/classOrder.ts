"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getClassOrdersByQuery = async (query: string) => {
  const res = await fetch(BASE_URL + "/api/e-learning/class-orders?" + query);

  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};
export const getClassOrderById = async (id: string) => {
  const res = await fetch(BASE_URL + "/api/e-learning/class-orders/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};

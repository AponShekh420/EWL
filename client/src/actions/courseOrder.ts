"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getCourseOrdersByQuery = async (query: string) => {
  const res = await fetch(BASE_URL + "/api/e-learning/orders?" + query);

  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};
export const getCourseOrderById = async (id: string) => {
  const res = await fetch(BASE_URL + "/api/e-learning/orders/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};

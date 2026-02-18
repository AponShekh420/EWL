"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getReviewsByQuery = async (query: string) => {
  const res = await fetch(BASE_URL + "/api/ecommerce/reviews?" + query);
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return res.json();
};

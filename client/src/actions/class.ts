"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getClassBySlug = async (slug: string) => {
  const res = await fetch(BASE_URL + "/api/e-learning/class/" + slug);
  if (!res.ok) {
    throw new Error("Failed to fetch class by slug");
  }
  return res.json();
};
export const getClassByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/e-learning/classes-by-filter?" + query,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch class by query");
  }
  return res.json();
};

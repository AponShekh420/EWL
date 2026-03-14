"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getCourseBySlug = async (slug: string) => {
  const res = await fetch(BASE_URL + "/api/e-learning/course/" + slug);
  if (!res.ok) {
    throw new Error("Failed to fetch course by slug");
  }
  return res.json();
};
export const getCourseByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/e-learning/courses-by-filter?" + query,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch course by query");
  }
  return res.json();
};

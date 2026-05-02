"use server";

import { BASE_URL } from "@/utils/envVariable";
import { cookies } from "next/headers";

export const getCourseBySlug = async (slug: string) => {
  const cookieStore = await cookies();
  const res = await fetch(BASE_URL + "/api/e-learning/course/" + slug, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), // forward cookies
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch course by slug");
  }
  return res.json();
};
export const getCourseByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/e-learning/courses-by-filter-frontend?" + query,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch course by query");
  }
  return res.json();
};

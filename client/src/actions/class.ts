"use server";

import { BASE_URL } from "@/utils/envVariable";
import { cookies } from "next/headers";

export const getClassBySlug = async (slug: string) => {
  const cookieStore = await cookies();
  const res = await fetch(BASE_URL + "/api/e-learning/class/" + slug, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), // forward cookies
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch class by slug");
  }
  return res.json();
};
export const getClassByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/e-learning/classes-by-filter-frontend?" + query,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch class by query");
  }
  return res.json();
};

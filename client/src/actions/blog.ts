"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getBlogBySlug = async (slug: string) => {
  const res = await fetch(BASE_URL + "/api/blog/blog/" + slug, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blog by slug");
  }
  return res.json();
};

export const getBlogByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/blog/blogs-by-filter?" + query,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blog by slug");
  }
  return res.json();
};

export const getBlogByQueryWithVisible = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/blog/blogs-by-filter?visible=yes&" + query,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blog by slug");
  }
  return res.json();
};

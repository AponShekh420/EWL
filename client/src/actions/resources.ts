"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getResourcesBySlug = async (slug: string) => {
  const res = await fetch(
    BASE_URL + "/api/resources-management/resources/" + slug,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch resources by slug");
  }
  return res.json();
};

export const getResourcesByQuery = async (query: string) => {
  const res = await fetch(
    BASE_URL + "/api/resources-management/resources-by-filter?" + query,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blog by slug");
  }
  return res.json();
};

export const getResourcesByQueryWithVisible = async (query: string) => {
  const res = await fetch(
    BASE_URL +
      "/api/resources-management/resources-by-filter?status=publish&" +
      query,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blog by slug");
  }
  return res.json();
};

"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getSpeakerBySlug = async (slug: string) => {
  const res = await fetch(BASE_URL + "/api/account/speaker/" + slug);
  if (!res.ok) {
    throw new Error("Failed to fetch speaker by slug");
  }
  return res.json();
};
"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getPaidSpeakerWithFilter = async () => {
  const res = await fetch(BASE_URL + "/api/paid-hotline/filter-speaker");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};
export const getAllPaidSpeaker = async () => {
  const res = await fetch(BASE_URL + "/api/paid-hotline/speaker");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};
export const getPaidSpeakerById = async (id: string) => {
  const res = await fetch(BASE_URL + "/api/paid-hotline/speaker/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

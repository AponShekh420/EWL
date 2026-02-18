"use server";

import { BASE_URL } from "@/utils/envVariable";

export const getUsersByQuery = async (query: string) => {
  const res = await fetch(BASE_URL + "/api/account/users?" + query);
  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }
  return res.json();
};
export const getUserById = async (id: string) => {
  const res = await fetch(BASE_URL + "/api/account/users/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

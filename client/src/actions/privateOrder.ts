"use server";

import { BASE_URL } from "@/utils/envVariable";
import { cookies } from "next/headers";


export const getPrivateOrdersByQuery = async (query: string) => {
  const cookieStore = await cookies();
  const res = await fetch(BASE_URL + "/api/ecommerce/my-orders?" + query, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), // forward cookies
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};
export const getPrivateOrderById = async (id: string) => {
  const cookieStore = await cookies();
  console.log(id)
  const res = await fetch(BASE_URL + "/api/ecommerce/my-orders/" + id, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), // forward cookies
    },
  });
  console.log("pr")
  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return res.json();
};

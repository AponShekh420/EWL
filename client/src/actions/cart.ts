"use server";
import { BASE_URL } from "@/utils/envVariable";
import { cookies } from "next/headers";

export const getCartList = async () => {
  const cookieStore = await cookies();
  const res = await fetch(BASE_URL + "/api/ecommerce/cart-list", {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart list");
  }
  return res.json();
};

"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "@/utils/envVariable";

export const getCourseModules = async (
  slug: string
) => {

  const cookieStore = await cookies();

  const res = await fetch(
    BASE_URL + "/api/e-learning/course-modules",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), // forward cookies
      },
      body: JSON.stringify({
        slug
      }),
      cache: "no-store"
    }
  );

  return res.json();
};



// if (!res.ok) {
  //   throw new Error("Failed to fetch records by slug");
  // }
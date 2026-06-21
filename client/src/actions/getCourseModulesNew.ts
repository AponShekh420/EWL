"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "@/utils/envVariable";
import { modulesType } from "@/types/Course";

export const getCourseModulesNew = async (
  courseId: string,
  modules: modulesType[]
) => {

  const cookieStore = await cookies();

  const res = await fetch(
    BASE_URL + "/api/e-learning/course-modules-new",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(), // forward cookies
      },
      body: JSON.stringify({
        courseId,
        modules,
      }),
      cache: "no-store"
    }
  );

  return res.json();
};



// if (!res.ok) {
  //   throw new Error("Failed to fetch records by slug");
  // }
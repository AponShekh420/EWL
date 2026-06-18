"use client";
import { BlogCategoryType } from "@/types/BlogCategory";
import { PaginationType } from "@/types/Pagination";
import { BlogType } from "@/types/Blog";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PostBox } from "./PostBox";
import { Button } from "../ui/button";

export default function ShopSection({
  blogs,
  categories,
}: {
  blogs: BlogType[];
  categories: BlogCategoryType[];
  pagination: PaginationType;
}) {

  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  // const tags = Array.from(
  //   new Set(
  //     blogs.flatMap((blog) => blog.tags ?? [])
  //   )
  // );

  return (
    <section className="mt-6">
      <div className="flex gap-2 w-full overflow-x-auto">
        <Button variant={"outline"} className={`group flex hover:bg-violet-cs ${!activeCategory ? "text-white bg-violet-cs" : "text-violet-cs"} hover:text-white text-sm`}>
          <Link
            href="/blog"
            className={`capitalize hover:text-white group-hover:text-white ${
              !activeCategory ? "text-white" : "text-violet-cs"
            }`}
          >
            All
          </Link>
        </Button>

        {categories.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <Button variant={"outline"} className={`group flex hover:bg-violet-cs ${isActive ? "text-white bg-violet-cs" : "text-violet-cs"} hover:text-white text-sm`}
              key={category._id}
            >
              <Link
                href={`/blog?category=${category.slug}`}
                className={`capitalize hover:text-white group-hover:text-white ${
                  isActive ? "text-white" : "text-violet-cs"
                }`}
              >
                {category.name}
              </Link>
            </Button>
          );
        })}
      </div>
      <div>
        <div className="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-2">
          {blogs?.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog._id}>
              <PostBox blog={blog} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

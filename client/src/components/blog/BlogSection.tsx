"use client";
import { BlogCategoryType } from "@/types/BlogCategory";
import { PaginationType } from "@/types/Pagination";
import { BlogType } from "@/types/Blog";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
import ScrollArea from "../common/ScrollArea";
import { useSearchParams } from "next/navigation";
import { PostBox } from "./PostBox";

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
    <section className="mt-6 grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-x-6">
      <aside className="">
        <div className="border p-4">
          <h5 className="font-medium text-lg">Blog categories</h5>
          <hr className="mt-2 mb-3" />
          <ScrollArea className="h-70">
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-sm">
                <Link
                  href="/blog"
                  className={`capitalize hover:text-teal ${
                    !activeCategory ? "text-teal" : "text-gray-500"
                  }`}
                >
                  All
                </Link>
              </li>

              {categories.map((category) => {
                const isActive = activeCategory === category.slug;

                return (
                  <li
                    key={category._id}
                    className="flex justify-between items-center text-sm"
                  >
                    <Link
                      href={`/blog?category=${category.slug}`}
                      className={`capitalize hover:text-teal ${
                        isActive ? "text-teal" : "text-gray-500"
                      }`}
                    >
                      {category.name}
                    </Link>

                    <span>({category.blogs.length})</span>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
        
        {/* <div className="border p-4 my-8 hidden">
          <h4 className="uppercase font-medium">Popular Tags</h4>
          <hr className="mt-2 mb-3" />
          <div className="flex flex-wrap gap-2 py-2">
            {tags.map((tag, index) => (
              <Link href={`/blog?tag=${tag.replaceAll(" ", "-")}`} key={index}>
                <Button variant="outline" className="capitalize">
                  {tag}
                </Button>
              </Link>
            ))}
          </div>
        </div> */}
      </aside>
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

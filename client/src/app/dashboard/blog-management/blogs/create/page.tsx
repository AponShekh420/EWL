import { getBlogCategories } from "@/actions/blogCategory";
import BlogForm from "@/components/dashboard/blog/blogs/BlogForm";
import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CreateBlog() {
  const { data: categoriesData } = await getBlogCategories();
  const categories = categoriesData?.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    }),
  );
  return (
    <div>
      <PageHeading
        pageTitle="Create Blog Post"
        breadcrumbList={[
          { name: "Blog Management", href: "" },
          { name: "Blogs", href: "/dashboard/blog-management/blogs" },
          { name: "Create", href: "/dashboard/blog-management/blogs/create" },
        ]}
      >
        <Link href="/dashboard/blog-management/blogs">
          <Button variant="blue">
            <span>See Blogs</span>
          </Button>
        </Link>
      </PageHeading>
      <BlogForm categories={categories} />
    </div>
  );
}

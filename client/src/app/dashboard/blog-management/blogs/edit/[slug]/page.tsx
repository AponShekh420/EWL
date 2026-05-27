import { getBlogBySlug } from "@/actions/blog";
import { getBlogCategories } from "@/actions/blogCategory";
import BlogForm from "@/components/dashboard/blog/blogs/BlogForm";
import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditBlog({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const [blogData, categoriesData] = await Promise.all([
    getBlogBySlug(slug),
    getBlogCategories(),
  ]);

  const categories = categoriesData.data.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    }),
  );
  return (
    <div>
      <PageHeading
        pageTitle="Edit Blog"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Blogs", href: "/dashboard/blog-management/blogs" },
          { name: `Edit`, href: `/dashboard/blog-management/blogs/edit/${slug}` },
          { name: `${slug}`, href: `/dashboard/blog-management/blogs/edit/${slug}` },
        ]}
      >
        <Link href="/dashboard/blog-management/blogs">
          <Button variant="blue">
            <span>See Blogs</span>
          </Button>
        </Link>
      </PageHeading>

      <BlogForm BlogData={blogData?.data} categories={categories} />
    </div>
  );
}

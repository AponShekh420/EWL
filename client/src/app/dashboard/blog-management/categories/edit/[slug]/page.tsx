import { getBlogCategoryBySlug } from "@/actions/blogCategory";
import BlogCategoryForm from "@/components/dashboard/blog/category/BlogCategoryForm";
import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditBlogCategory({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data: category } = await getBlogCategoryBySlug(slug);

  return (
    <div>
      <PageHeading
        pageTitle="Edit Blog Category"
        breadcrumbList={[
          { name: "Blog", href: "" },
          { name: "Categories", href: "/dashboard/blog-management/categories" },
          {
            name: "Edit",
            href: `/dashboard/blog-management/categories/edit/${slug}`,
          },
          {
            name: slug,
            href: `/dashboard/blog-management/categories/edit/${slug}`,
          },
        ]}
      >
        <Link href="/dashboard/blog-management/categories">
          <Button variant="blue">
            <span>See Blog Categories</span>
          </Button>
        </Link>
      </PageHeading>
      <BlogCategoryForm category={category} />
    </div>
  );
}

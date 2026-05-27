import BlogCategoryForm from "@/components/dashboard/blog/category/BlogCategoryForm";
import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateBlogCategory() {
  return (
    <div>
      <PageHeading
        pageTitle="Create Blog Category"
        breadcrumbList={[
          { name: "Blog", href: "" },
          { name: "Categories", href: "/dashboard/blog-management/categories" },
          { name: "Create", href: "/dashboard/blog-management/categories/create" },
        ]}
      >
        <Link href="/dashboard/blog-management/categories">
          <Button variant="blue">
            <span>See BlogCategories</span>
          </Button>
        </Link>
      </PageHeading>
      <BlogCategoryForm />
    </div>
  );
}

import { getBlogCategoriesByQuery } from "@/actions/blogCategory";
import PageHeading from "@/components/dashboard/common/PageHeading";
import BlogCategoriesTable from "@/components/dashboard/common/tables/BlogCategoriesTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function BlogCategories({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: categories, pagination } = await getBlogCategoriesByQuery(query);
  return (
    <div>
      <PageHeading
        pageTitle="Categories"
        breadcrumbList={[
          { name: "Blog Management", href: "/dashboard/blog-management" },
          { name: "Categories", href: "/dashboard/blog-management/categories" },
        ]}
      >
        <Link href="/dashboard/blog-management/categories/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Category</span>
          </Button>
        </Link>
      </PageHeading>
      <BlogCategoriesTable categories={categories} pagination={pagination} />
    </div>
  );
}

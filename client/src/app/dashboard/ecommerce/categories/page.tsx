import PageHeading from "@/components/dashboard/common/PageHeading";
import CategoriesTable from "@/components/dashboard/common/tables/CategoriesTable";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Categories({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const res = await fetch(
    BASE_URL + "/api/ecommerce/categories-by-filter?" + query
  );
  const { data: categories, pagination } = await res.json();
  return (
    <div>
      <PageHeading
        pageTitle="Categories"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Categories", href: "/ecommerce/categories" },
        ]}
      >
        <Link href="/dashboard/ecommerce/categories/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Category</span>
          </Button>
        </Link>
      </PageHeading>
      <CategoriesTable categories={categories} pagination={pagination} />
    </div>
  );
}

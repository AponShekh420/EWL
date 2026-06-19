import { getResourcesCategoriesByQuery } from "@/actions/resourcesCategory";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ResourceCategoriesTable from "@/components/dashboard/common/tables/ResourceCategoryTable";
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
  const { data: categories, pagination } =
    await getResourcesCategoriesByQuery(query);
  return (
    <div>
      <PageHeading
        pageTitle="Categories"
        breadcrumbList={[
          { name: "Resources", href: "/resources" },
          { name: "Categories", href: "/resources/categories" },
        ]}
      >
        <Link href="/dashboard/resources/categories/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Category</span>
          </Button>
        </Link>
      </PageHeading>
      <ResourceCategoriesTable
        categories={categories}
        pagination={pagination}
      />
    </div>
  );
}

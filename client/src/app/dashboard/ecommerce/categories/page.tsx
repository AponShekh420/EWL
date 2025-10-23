import PageHeading from "@/components/dashboard/common/PageHeading";
import CategoriesTable from "@/components/dashboard/common/tables/CategoriesTable";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants/product-categories";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Categories() {
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
      <CategoriesTable categories={categories} />
    </div>
  );
}

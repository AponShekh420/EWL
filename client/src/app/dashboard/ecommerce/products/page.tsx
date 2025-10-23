import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductTable from "@/components/dashboard/common/tables/ProductTable";
import { Button } from "@/components/ui/button";
import { productsData } from "@/constants/products";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Products() {
  return (
    <div>
      <PageHeading
        pageTitle="Products"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Product List", href: "/ecommerce/products" },
        ]}
      >
        <Button variant="outline">
          <Icon icon="charm:upload" width="32" height="32" />
          <span>Export</span>
        </Button>
        <Link href="/dashboard/ecommerce/products/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Product</span>
          </Button>
        </Link>
      </PageHeading>

      <ProductTable products={productsData} />
    </div>
  );
}

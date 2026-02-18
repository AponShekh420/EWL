import { getProductByQuery } from "@/actions/product";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductTable from "@/components/dashboard/common/tables/ProductTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: productsData, pagination } = await getProductByQuery(query);

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
      {productsData && (
        <ProductTable products={productsData} pagination={pagination} />
      )}
    </div>
  );
}

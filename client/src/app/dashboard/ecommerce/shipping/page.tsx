import { getShippingByQuery } from "@/actions/shipping";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ShippingTable from "@/components/dashboard/common/tables/ShippingTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Shipping({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: shippings, pagination } = await getShippingByQuery(query);
  return (
    <div>
      <PageHeading
        pageTitle="Shipping"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Shipping", href: "/ecommerce/shipping" },
        ]}
      >
        <Link href="/dashboard/ecommerce/shipping/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Shipping</span>
          </Button>
        </Link>
      </PageHeading>
      <ShippingTable shippings={shippings} pagination={pagination} />
    </div>
  );
}

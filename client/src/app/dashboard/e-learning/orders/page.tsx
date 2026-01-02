import PageHeading from "@/components/dashboard/common/PageHeading";
import OrderTable from "@/components/dashboard/common/tables/OrderTable";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const res = await fetch(BASE_URL + "/api/ecommerce/orders?" + query);
  const { data: orders, pagination } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch orders detail");
  }
  return (
    <div>
      <PageHeading
        pageTitle="Orders"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Orders", href: "/ecommerce/orders" },
        ]}
      >
        <Button variant="blue">
          <Icon icon="charm:upload" width="32" height="32" />
          <span>Export</span>
        </Button>
      </PageHeading>
      <OrderTable orders={orders} pagination={pagination} />
    </div>
  );
}

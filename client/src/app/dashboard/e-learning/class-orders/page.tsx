import { getClassOrdersByQuery } from "@/actions/classOrder";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ClassOrderTable from "@/components/dashboard/common/tables/ClassOrderTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: orders, pagination } = await getClassOrdersByQuery(query);

  return (
    <div>
      <PageHeading
        pageTitle="Orders"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Orders", href: "/ecommerce/class-orders" },
        ]}
      >
        <Button variant="blue">
          <Icon icon="charm:upload" width="32" height="32" />
          <span>Export</span>
        </Button>
      </PageHeading>
      <ClassOrderTable orders={orders} pagination={pagination} />
    </div>
  );
}

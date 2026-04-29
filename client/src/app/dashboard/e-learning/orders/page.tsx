import { getCourseOrdersByQuery } from "@/actions/courseOrder";
import PageHeading from "@/components/dashboard/common/PageHeading";
import CourseOrderTable from "@/components/dashboard/common/tables/CourseOrderTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: orders, pagination } = await getCourseOrdersByQuery(query);

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
      <CourseOrderTable orders={orders} pagination={pagination} />
    </div>
  );
}

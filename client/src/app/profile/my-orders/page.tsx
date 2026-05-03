import { getPrivateOrdersByQuery } from "@/actions/privateOrder";
import FrontPageHeading from "@/components/dashboard/common/FrontPageHeading";
import MyOrderTable from "@/components/dashboard/common/tables/MyOrderTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import Link from "next/link";

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: orders, pagination } = await getPrivateOrdersByQuery(query);
  return (
    <div>
      <FrontPageHeading
        pageTitle="Orders"
        breadcrumbList={[
          { name: "E-commerce", href: "/shop" },
          { name: "Orders", href: "/profile/my-orders" },
        ]}
      >
        <Link href={`/shop`}>
          <Button variant="blue">
            <span>Buy More</span>
          </Button>
        </Link>
      </FrontPageHeading>
      <MyOrderTable orders={orders} pagination={pagination} />
    </div>
  );
}

import PageHeading from "@/components/dashboard/common/PageHeading";
import OrderTable from "@/components/dashboard/common/tables/OrderTable";
import { Button } from "@/components/ui/button";
import { order_data } from "@/constants/order-data";
import { Icon } from "@iconify/react";

export default function Orders() {
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
      <OrderTable orders={order_data} />
    </div>
  );
}

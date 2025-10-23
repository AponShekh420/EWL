import PageHeading from "@/components/dashboard/common/PageHeading";
import OrderForm from "@/components/dashboard/ecommerce/orders/OrderForm";
import { Button } from "@/components/ui/button";
import { order_data } from "@/constants/order-data";
import { OrderType } from "@/types/Order";
import Link from "next/link";

export default async function EditOrder({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const order = order_data.find((order) => order.id === id) as OrderType;
  return (
    <div>
      <PageHeading
        pageTitle="Edit Order"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Orders", href: "/ecommerce/orders" },
          {
            name: "Edit",
            href: `/ecommerce/orders/edit/${id}`,
          },
        ]}
      >
        <Link href="/dashboard/ecommerce/orders">
          <Button variant="blue">
            <span>See Orders</span>
          </Button>
        </Link>
      </PageHeading>
      <OrderForm order={order} />
    </div>
  );
}

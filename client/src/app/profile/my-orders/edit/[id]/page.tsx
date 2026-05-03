import { getOrderById } from "@/actions/order";
import PageHeading from "@/components/dashboard/common/PageHeading";
import OrderForm from "@/components/dashboard/ecommerce/orders/OrderForm";
import { Button } from "@/components/ui/button";
import { OrderType } from "@/types/Order";
import Link from "next/link";

export default async function EditOrder({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: order }: { data: OrderType } = await getOrderById(id);

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

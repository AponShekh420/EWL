import PageHeading from "@/components/dashboard/common/PageHeading";
import OrderForm from "@/components/dashboard/ecommerce/orders/OrderForm";
import { Button } from "@/components/ui/button";
import { OrderType } from "@/types/Order";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function EditOrder({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await fetch(BASE_URL + "/api/ecommerce/orders/" + id);
  const { data: order }: { data: OrderType } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch order details");
  }
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

import { getShippingById } from "@/actions/shipping";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ShippingForm from "@/components/dashboard/ecommerce/shipping/ShippingForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: shipping } = await getShippingById(id);

  return (
    <div>
      <PageHeading
        pageTitle="Edit Shipping"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Categories", href: "/ecommerce/categories" },
          {
            name: "Edit",
            href: `/ecommerce/shipping/edit/${id}`,
          },
          {
            name: id,
            href: `/ecommerce/shipping/edit/${id}`,
          },
        ]}
      >
        <Link href="/dashboard/ecommerce/shipping">
          <Button variant="blue">
            <span>See shipping</span>
          </Button>
        </Link>
      </PageHeading>
      <ShippingForm shipping={shipping} />
    </div>
  );
}

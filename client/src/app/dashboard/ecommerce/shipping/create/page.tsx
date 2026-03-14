import PageHeading from "@/components/dashboard/common/PageHeading";
import ShippingForm from "@/components/dashboard/ecommerce/shipping/ShippingForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateShipping() {
  return (
    <div>
      <PageHeading
        pageTitle="Create Shipping"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Shipping", href: "/dashboard/ecommerce/shipping" },
          { name: "Create", href: "/dashboard/ecommerce/shipping/create" },
        ]}
      >
        <Link href="/dashboard/ecommerce/shipping">
          <Button variant="blue">
            <span>See Shipping</span>
          </Button>
        </Link>
      </PageHeading>
      <ShippingForm />
    </div>
  );
}

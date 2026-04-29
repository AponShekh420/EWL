import PageHeading from "@/components/dashboard/common/PageHeading";
import FlatRateBoxes from "@/components/dashboard/ecommerce/shipping-boxes/FlatRateBoxes";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Shipping() {
  return (
    <div>
      <PageHeading
        pageTitle="USPS Configuration"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "USPS Configuration", href: "/ecommerce/usps-configuration" },
        ]}
      >
        <Link href="/dashboard/ecommerce/shipping">
          <Button variant="blue">
            <span>Shipping zone</span>
            <Icon icon="mingcute:arrow-right-fill" width="24" height="24" />
          </Button>
        </Link>
      </PageHeading>
      <FlatRateBoxes/>
    </div>
  );
}

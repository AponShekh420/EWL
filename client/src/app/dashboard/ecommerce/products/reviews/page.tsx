import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductReviewsTable from "@/components/dashboard/common/tables/ProductReviewsTable";
import { Button } from "@/components/ui/button";
import { productReviews } from "@/constants/product-reviews";

import Link from "next/link";

export default function Reviews() {
  return (
    <div>
      <PageHeading
        pageTitle="Product reviews"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Products", href: "/ecommerce/products" },
          { name: "Reviews", href: "/ecommerce/products/reviews" },
        ]}
      >
        <Link href="/dashboard/ecommerce/products">
          <Button variant="blue">
            <span>See products</span>
          </Button>
        </Link>
      </PageHeading>
      <ProductReviewsTable reviews={productReviews} />
    </div>
  );
}

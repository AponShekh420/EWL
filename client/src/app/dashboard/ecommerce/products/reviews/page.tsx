import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductReviewsTable from "@/components/dashboard/common/tables/ProductReviewsTable";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";

import Link from "next/link";

export default async function Reviews({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = await searchParams;
  const res = await fetch(
    BASE_URL + "/api/ecommerce/reviews?page=" + page.page
  );
  const { data: reviews, pagination } = await res.json();
  console.log(reviews);
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
      <ProductReviewsTable reviews={reviews} pagination={pagination} />
    </div>
  );
}

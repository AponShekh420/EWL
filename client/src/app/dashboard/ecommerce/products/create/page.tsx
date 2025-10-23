import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductForm from "@/components/dashboard/ecommerce/products/ProductForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateProduct() {
  return (
    <div>
      <PageHeading
        pageTitle="Create Product"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Products", href: "/ecommerce/products" },
          { name: "Create", href: "/ecommerce/products/create" },
        ]}
      >
        <Link href="/dashboard/ecommerce/products">
          <Button variant="blue">
            <span>See Products</span>
          </Button>
        </Link>
      </PageHeading>
      <ProductForm />
    </div>
  );
}

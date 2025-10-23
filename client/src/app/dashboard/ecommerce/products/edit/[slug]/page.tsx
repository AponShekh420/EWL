import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductForm from "@/components/dashboard/ecommerce/products/ProductForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditProduct({ params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log(slug);
  return (
    <div>
      <PageHeading
        pageTitle="Edit Product"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Products", href: "/ecommerce/products" },
          { name: `Edit`, href: `/ecommerce/products/edit/${slug}` },
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

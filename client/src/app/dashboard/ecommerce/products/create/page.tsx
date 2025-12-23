import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductForm from "@/components/dashboard/ecommerce/products/ProductForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function CreateProduct() {
  const res = await fetch(BASE_URL + "/api/ecommerce/categories");
  const { data: categoriesData } = await res.json();

  const categories = categoriesData.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    })
  );
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
      <ProductForm categories={categories} />
    </div>
  );
}

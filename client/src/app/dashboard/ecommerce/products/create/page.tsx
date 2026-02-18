import { getCategories } from "@/actions/category";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductForm from "@/components/dashboard/ecommerce/products/ProductForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CreateProduct() {
  const { data: categoriesData } = await getCategories();
  const categories = categoriesData?.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    }),
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

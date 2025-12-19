import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductForm from "@/components/dashboard/ecommerce/products/ProductForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const [productRes, categoryRes] = await Promise.all([
    fetch(BASE_URL + "/api/ecommerce/products/" + id),
    fetch(BASE_URL + "/api/ecommerce/categories"),
  ]);

  const [productData, categoriesData] = await Promise.all([
    productRes.json(),
    categoryRes.json(),
  ]);

  const categories = categoriesData.data.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    })
  );
  return (
    <div>
      <PageHeading
        pageTitle="Edit Product"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Products", href: "/ecommerce/products" },
          { name: `Edit`, href: `/ecommerce/products/edit/${id}` },
        ]}
      >
        <Link href="/dashboard/ecommerce/products">
          <Button variant="blue">
            <span>See Products</span>
          </Button>
        </Link>
      </PageHeading>

      <ProductForm productData={productData?.data} categories={categories} />
    </div>
  );
}

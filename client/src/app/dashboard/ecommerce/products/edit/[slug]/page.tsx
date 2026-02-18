import { getCategories } from "@/actions/category";
import { getProductBySlug } from "@/actions/product";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductForm from "@/components/dashboard/ecommerce/products/ProductForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditProduct({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const [productData, categoriesData] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  const categories = categoriesData.data.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    }),
  );
  return (
    <div>
      <PageHeading
        pageTitle="Edit Product"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Products", href: "/ecommerce/products" },
          { name: `Edit`, href: `/ecommerce/products/edit/${slug}` },
          { name: `${slug}`, href: `/ecommerce/products/edit/${slug}` },
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

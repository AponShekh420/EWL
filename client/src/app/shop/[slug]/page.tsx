import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import MoreProductInfoSection from "@/components/shop/product-details/MoreProductInfoSection";
import RelatedProductSection from "@/components/shop/product-details/RelatedProductSection";
import ShopDetailSection from "@/components/shop/product-details/ShopDetailSection";
import { BASE_URL } from "@/utils/envVariable";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const res = await fetch(BASE_URL + "/api/ecommerce/products/" + slug);
  const { data: product } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }
  return (
    <main className="container min-h-screen">
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
        <BreadcrumbPath
          breadcrumbList={[
            { name: "Home", href: "/" },
            { name: "Product Details", href: "/shop/" + slug },
          ]}
        />
      </div>
      <ShopDetailSection product={product} />
      <MoreProductInfoSection product={product} />
      <RelatedProductSection category={product.category} />
    </main>
  );
}

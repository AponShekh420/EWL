import { getCategories } from "@/actions/category";
import { getProductByQuery, getProductBySlug } from "@/actions/product";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import MoreProductInfoSection from "@/components/shop/product-details/MoreProductInfoSection";
import RelatedProductSection from "@/components/shop/product-details/RelatedProductSection";
import ShopDetailSection from "@/components/shop/product-details/ShopDetailSection";
import { CategoryType } from "@/types/Category";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data: product } = await getProductBySlug(slug);
  const { data: bestSelling } = await getProductByQuery("?sort=popularity");
  const { data: categories } = await getCategories();

  return (
    <main className="container min-h-screen">
      <div>
        <div className="flex items-center gap-6 justify-center py-4 flex-wrap">
          {categories.map((category: CategoryType) => (
            <Link key={category._id} href={`/shop?category=${category.slug}`}>
              <Image
                src={getImageUrl(category.thumbnail, "category")}
                width={40}
                height={40}
                alt="category"
                className="size-10 rounded-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
        <BreadcrumbPath
          breadcrumbList={[
            { name: "Home", href: "/" },
            { name: "Product Details", href: "/shop/" + slug },
          ]}
        />
      </div>
      <ShopDetailSection product={product} bestSelling={bestSelling} />
      <MoreProductInfoSection product={product} />
      <RelatedProductSection category={product.category} />
    </main>
  );
}

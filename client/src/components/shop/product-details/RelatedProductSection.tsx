import GridProductCard from "@/components/common/GridProductCard";
import { ProductType } from "@/types/Product";
import { BASE_URL } from "@/utils/envVariable";

export default async function RelatedProductSection({
  category,
}: {
  category: string;
}) {
  const res = await fetch(
    BASE_URL + `/api/ecommerce/product-by-filter?category=${category}&limit=20`,
  );
  const { data: productsData } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return (
    <section className="my-20">
      <div>
        <h1 className="text-lg sm:text-xl w-fit relative font-semibold after:w-full after:h-0.5 after:bg-gray-600 after:absolute after:-bottom-2.5 after:left-0">
          Related Products
        </h1>
        <hr className="mt-2 mb-4" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productsData.map((product: ProductType) => (
          <GridProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

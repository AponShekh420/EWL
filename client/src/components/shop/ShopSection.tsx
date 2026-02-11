"use client";
import { CategoryType } from "@/types/Category";
import { PaginationType } from "@/types/Pagination";
import { ProductType } from "@/types/Product";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GridProductCard from "../common/GridProductCard";
import ListProductCard from "../common/ListProductCard";
import ScrollArea from "../common/ScrollArea";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

const productTags = [
  "creams",
  "eyebrow pencil",
  "eyeliner",
  "eye shadow",
  "lotions",
  "muscara",
];
export default function ShopSection({
  products,
  categories,
  pagination,
  price,
}: {
  products: ProductType[];
  categories: CategoryType[];
  pagination: PaginationType;
  price: { maxPrice: number; minPrice: number };
}) {
  const [isListView, setIsListView] = useState(false);
  const router = useRouter();

  const [priceRange, setPriceRange] = useState({
    min: price.minPrice,
    max: price.maxPrice,
  });

  return (
    <section className="mt-6 grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-x-6">
      <aside className="">
        <div className="border p-4">
          <h5 className="font-medium text-lg">Product categories</h5>
          <hr className="mt-2 mb-3" />
          <ScrollArea className="h-70">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center text-gray-500 text-sm"
                >
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="hover:text-teal capitalize"
                  >
                    {category.name}
                  </Link>
                  <span>({category.products.length})</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
        <div className="border p-4 my-8">
          <h4 className="uppercase font-medium">Filter by price</h4>
          <hr className="mt-2 mb-3" />
          <div className="mt-4">
            <Slider
              defaultValue={[price.minPrice, price.maxPrice]}
              max={price.maxPrice}
              step={5}
              className="mx-auto w-full max-w-xs py-4"
              onValueChange={(value) => {
                const [min, max] = value;
                setPriceRange({ min, max });
              }}
            />

            <div className="flex items-center justify-between mt-2">
              <button
                onClick={() =>
                  router.push(
                    `/shop?minPrice=${priceRange.min}&maxPrice=${priceRange.max}`,
                  )
                }
                className="bg-teal text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-teal/90"
              >
                FILTER
              </button>
              <span className="text-sm font-medium">
                ${priceRange.min} - ${priceRange.max}
              </span>
            </div>
          </div>
        </div>
        <div className="border p-4 my-8 hidden">
          <h4 className="uppercase font-medium">Popular Tags</h4>
          <hr className="mt-2 mb-3" />
          <div className="flex flex-wrap gap-2 py-2">
            {productTags.map((tag, index) => (
              <Link href={`/shop?tag=${tag.replaceAll(" ", "-")}`} key={index}>
                <Button variant="outline" key={index} className="capitalize">
                  {tag}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </aside>
      <div>
        <div className="border p-6 sm:p-2 flex flex-col-reverse sm:flex-row gap-3 justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsListView(false)}
              className="flex gap-2 items-center group hover:text-teal "
            >
              <span
                className={`p-1.5 rounded-full ${!isListView ? "bg-teal text-white" : ""}`}
              >
                <Icon icon="ph:grid-nine-fill" width="20" height="20" />
              </span>
              <span className={`${!isListView ? " text-teal" : ""}`}>Grid</span>
            </button>
            <button
              onClick={() => setIsListView(true)}
              className="flex gap-2 items-center hover:text-teal "
            >
              <span
                className={`p-1.5 rounded-full ${isListView ? "bg-teal text-white" : ""}`}
              >
                <Icon
                  icon="material-symbols-light:view-list-sharp"
                  width="20"
                  height="20"
                />
              </span>
              <span className={`${isListView ? " text-teal" : ""}`}>List</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              onChange={(e) => router.push(`/shop?sort=${e.target.value}`)}
              className="border-none outline-0 focus:ring-0 text-base max-w-[150px] sm:max-w-[170px]"
            >
              <option className="" value="popularity">
                Sort by popularity
              </option>
              <option className="" value="average-rating">
                Sort by average rating
              </option>
              <option className="" value="latest">
                Sort by latest
              </option>
              <option className="" value="price-low-to-high">
                Sort by price: low to high
              </option>
              <option className="" value="price-high-to-low">
                Sort by price: high to low
              </option>
            </select>

            <p className="border-gray-600 sm:border-l sm:pl-4 text-base">
              {`Showing ${pagination.page}-${pagination.page + 9} of ${pagination.total} results`}
            </p>
          </div>
        </div>
        {isListView ? (
          <div className="space-y-20 mt-8">
            {products.map((product) => (
              <ListProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <GridProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

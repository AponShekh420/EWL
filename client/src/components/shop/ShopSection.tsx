"use client";
import { ProductType } from "@/types/Product";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GridProductCard from "../common/GridProductCard";
import ListProductCard from "../common/ListProductCard";
import { Button } from "../ui/button";
const categories = [
  {
    id: 1,
    name: "Accessories",
    slug: "accessories",
    products: 6,
  },
  {
    id: 2,
    name: "Bags",
    slug: "bags",
    products: 10,
  },
  {
    id: 3,
    name: "Clothings",
    slug: "clothings",
    products: 4,
  },
  {
    id: 4,
    name: "Shoes",
    slug: "shoes",
    products: 4,
  },
  {
    id: 5,
    name: "Face and Neck",
    slug: "face-and-neck",
    products: 3,
  },
];
const productTags = [
  "creams",
  "eyebrow pencil",
  "eyeliner",
  "eye shadow",
  "lotions",
  "muscara",
];
export default function ShopSection({ products }: { products: ProductType[] }) {
  const [isListView, setIsListView] = useState(false);
  const router = useRouter();
  const min = 0;
  const max = 10000;
  const [maxVal, setMaxVal] = useState(0);

  return (
    <section className="mt-6 grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-x-6">
      <aside className="">
        <div className="border p-4">
          <h5 className="font-medium text-lg">Product categories</h5>
          <hr className="mt-2 mb-3" />
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center text-gray-500 text-sm"
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="hover:text-teal"
                >
                  {category.name}
                </Link>
                <span>({category.products})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border p-4 my-8">
          <h4 className="uppercase font-medium">Filter by price</h4>
          <hr className="mt-2 mb-3" />
          <form className="mt-4">
            <input
              type="range"
              min={min}
              max={max}
              value={maxVal}
              onChange={(e) => setMaxVal(Math.max(Number(e.target.value)))}
              className="w-full accent-gray-700"
            />
            <div className="flex items-center justify-between mt-2">
              <button className="bg-teal text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-teal/90">
                FILTER
              </button>
              <span className="text-sm font-medium">
                ${min} - ${maxVal}
              </span>
            </div>
          </form>
        </div>
        <div className="border p-4 my-8">
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
              Showing 1–9 of 21 results
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

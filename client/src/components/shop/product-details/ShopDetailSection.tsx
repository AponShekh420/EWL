"use client";
import { ProductType } from "@/types/Product";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import "swiper/css";
import Rating from "../../common/Rating";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
export default function ShopDetailSection({
  product,
}: {
  product: ProductType;
}) {
  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_300px] gap-8">
        <div>
          <Image
            src={getImageUrl(product.thumbnail, "products")}
            width={500}
            height={500}
            alt={product.title}
            className="w-[250px] sm:w-[400px] md:w-full mx-auto object-cover max-h-[500px]"
          />

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, D_id) => (
              <div key={D_id}>
                <Image
                  src={getImageUrl(image, "products")}
                  width={150}
                  height={150}
                  alt={product.title}
                />
              </div>
            ))}

            {product.images.map((image, D_id) => (
              <div key={D_id}>
                <Image
                  src={getImageUrl(image, "products")}
                  width={150}
                  height={150}
                  alt={product.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:mt-8">
          <div className="pl-4 space-y-3 sm:space-y-5">
            <h2 className="text-2xl sm:text-3xl capitalize font-medium ">
              {product.title}
            </h2>
            <div className=" text-red-500 flex items-center gap-2">
              <Rating rating={5} className="size-4" />
              <span>Write a review</span>
            </div>
            <div className="flex items-end gap-4">
              <span className="text-teal font-bold text-2xl sm:text-4xl">
                ${product.salePrice}.00
              </span>
              <span className="text-gray-500 line-through text-xl sm:text-2xl">
                ${product.regularPrice}.00
              </span>
            </div>
            <div
              className="text-base"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="flex flex-col xs:flex-row xs:items-center gap-8 my-8">
              <div className="flex items-center gap-3">
                <span>Quantity</span>
                <Input
                  type="number"
                  min="0"
                  defaultValue="0"
                  className="w-[100px]"
                />
              </div>
              <Button className="hover:bg-teal uppercase rounded-full text-xs">
                add to cart
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <button className=" bg-gray-200 p-2 rounded-full hover:bg-teal hover:text-white group-hover:-translate-x-25">
                <Icon icon="mdi:heart" width="20" height="20" />
              </button>
              <button className=" bg-gray-200 p-2 rounded-full hover:bg-teal hover:text-white">
                <Icon icon="mdi-light:eye" width="20" height="20" />
              </button>
              <button className=" bg-gray-200 p-2.5 rounded-full hover:bg-teal hover:text-white">
                <Icon icon="icomoon-free:loop" width="14" height="14" />
              </button>
            </div>
            <div className="flex items-center gap-6 text-gray-700">
              <h5 className="capitalize font-medium text-lg">Share on: </h5>
              <div className="flex items-center gap-3.5">
                <a className="hover:text-teal" href="#">
                  <Icon icon="tabler:rss" width="22" height="22" />
                </a>
                <a className="hover:text-teal" href="#">
                  <Icon icon="mdi:vimeo" width="22" height="22" />
                </a>
                <a className="hover:text-teal" href="#">
                  <Icon icon="ri:twitter-x-fill" width="22" height="22" />
                </a>
                <a className="hover:text-teal" href="#">
                  <Icon icon="mdi:pinterest" width="22" height="22" />
                </a>
                <a className="hover:text-teal" href="#">
                  <Icon icon="mingcute:linkedin-line" width="25" height="25" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="border p-4">
            <h2 className="font-semibold text-lg">Best Selling Product</h2>
            <hr className="mt-1 mb-3" />
            <div className="space-y-5">
              {Array.from({ length: 5 }).map((_, ind) => (
                <div
                  key={ind}
                  className="flex gap-2.5 items-center border-b py-2.5"
                >
                  <Image
                    src={getImageUrl(product.thumbnail, "products")}
                    width={90}
                    height={90}
                    alt={product.title}
                    className="size-[80px] object-cover"
                  />
                  <div className="space-y-1">
                    <h5 className="text-base">{product.title}</h5>
                    <Rating rating={5} className="size-2.5 text-red-500" />
                    <h2 className=" font-semibold text-teal">
                      ${product.salePrice}.00
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

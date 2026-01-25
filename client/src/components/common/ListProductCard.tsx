"use client";
import { ProductType } from "@/types/Product";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import Rating from "../common/Rating";
import { Button } from "../ui/button";
export default function ListProductCard({ product }: { product: ProductType }) {
  return (
    <div
      key={product._id}
      className="flex flex-col items-center sm:flex-row sm:items-end justify-center gap-4"
    >
      <Link href={`/shop/${product.slug}`}>
        <Image
          src={getImageUrl(product.thumbnail, "products")}
          width={500}
          height={500}
          alt={product.title}
          className="w-[350px] h-[200px] object-cover"
        />
      </Link>
      <div className="pl-4 space-y-2">
        <Link
          href={`/shop/${product.slug}`}
          className="text-lg capitalize font-medium "
        >
          {product.title}
        </Link>
        <div className=" text-red-500">
          <Rating rating={5} className="size-3" />
        </div>
        <div className="flex items-end gap-4">
          <span className="text-teal font-bold text-xl">
            ${product.salePrice}.00
          </span>
          <span className="text-gray-500 line-through">
            ${product.regularPrice}.00
          </span>
        </div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="flex items-center gap-4 mt-6">
          <Button className="hover:bg-teal uppercase rounded-full text-xs">
            add to cart
          </Button>
          <button className=" bg-gray-200 p-2 rounded-full hover:bg-teal hover:text-white">
            <Icon icon="icomoon-free:loop" width="14" height="14" />
          </button>
          <button className=" bg-gray-200 p-1 rounded-full hover:bg-teal hover:text-white group-hover:-translate-x-25">
            <Icon icon="mdi:heart" width="20" height="20" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { ProductType } from "@/types/Product";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function ProductCard({ product }: { product: ProductType }) {
  const [isFill, setIsFill] = useState<boolean>(false);
  return (
    <div>
      <div className="relative">
        <Link href={`/dashboard/ecommerce/products/${product.slug}`}>
          <Image
            src={product.thumbnail}
            width={400}
            height={400}
            alt={product.name}
            className="w-full h-[200px] md:h-[400px] rounded-lg object-cover"
          />
        </Link>
        <button
          className={`absolute top-2 right-2 ${isFill ? "text-red-500" : ""}`}
          onClick={() => setIsFill((prev) => !prev)}
        >
          <Icon
            icon={isFill ? "line-md:heart-filled" : "mdi-light:heart"}
            width="28"
            height="28"
          />
        </button>
      </div>
      <div className="mt-2 space-y-1">
        <Link
          href={`/dashboard/ecommerce/products/${product.slug}`}
          className="font-bold hover:underline"
        >
          {product.name}
        </Link>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="flex gap-2 ">
          <p className="font-semibold">${product.price}</p>
          <p className="line-through text-gray-500">
            ${Number(product.price) + 20}.00
          </p>
        </div>
      </div>
    </div>
  );
}

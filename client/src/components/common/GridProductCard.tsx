"use client";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { ProductType } from "@/types/Product";
import { BASE_URL } from "@/utils/envVariable";
import { getAverageRating } from "@/utils/getAverageRating";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Rating from "../common/Rating";
import { Button } from "../ui/button";

export default function GridProductCard({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddtoCart = async (productId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/ecommerce/cart`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const cart = await res.json();
      setIsAdded(true);
      router.refresh();
      setTimeout(() => {
        setIsAdded(false);
        dispatch(addToCart({ isCartModalShow: true }));
      }, 500);

      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddtoWishlist = async (productId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/ecommerce/wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const wishlist = await res.json();
      toast.success("Product added in wishlist");
      console.log(wishlist);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div key={product._id}>
      <div className="relative">
        <Image
          src={getImageUrl(product.thumbnail, "products")}
          width={500}
          height={500}
          alt={product.title}
          className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover"
        />
        {/* hover show content */}
        <div className="absolute top-0 left-0 w-full h-full   group opacity-0 hover:opacity-100 transition-all duration-300">
          <div className="relative w-full h-full">
            <div className="inset-item transition-transform duration-300 group-hover:-translate-y-12 text-red-500">
              <Rating
                rating={getAverageRating(product.reviews)}
                className="size-4"
              />
            </div>
            <button className="inset-item group-hover:translate-x-18 transition-transform duration-300 bg-gray-200 p-2 rounded-full hover:bg-teal hover:text-white">
              <Icon icon="icomoon-free:loop" width="14" height="14" />
            </button>
            <Link
              href={`/shop/${product.slug}`}
              className="inset-item group-hover:translate-y-7 transition-transform duration-300 bg-gray-200 p-1 rounded-full hover:bg-teal hover:text-white"
            >
              <Icon icon="mdi-light:eye" width="20" height="20" />
            </Link>
            <button
              onClick={() => handleAddtoWishlist(product._id)}
              className={`inset-item transition-transform duration-300 bg-gray-200 p-1 rounded-full hover:bg-teal hover:text-white group-hover:-translate-x-25 `}
            >
              <Icon icon="mdi:heart" width="20" height="20" />
            </button>

            <Button
              onClick={() => handleAddtoCart(product._id)}
              className="hover:bg-teal uppercase inset-item rounded-full text-xs"
            >
              {isAdded ? "added..." : "add to cart"}
            </Button>
          </div>
        </div>
      </div>
      <div className="pl-4">
        <Link href={`/shop/${product.slug}`}>
          <span className="text-lg font-medium">{product.title}</span>
        </Link>

        <h5 className="text-teal">${product.salePrice}.00</h5>
      </div>
    </div>
  );
}

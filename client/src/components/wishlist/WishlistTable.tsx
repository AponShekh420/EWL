"use client";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { ProductType } from "@/types/Product";
import { BASE_URL } from "@/utils/envVariable";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

export default function WishlistTable({
  products,
}: {
  products: ProductType[];
}) {
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
  const wishlistDeleteHandler = async (productId: string) => {
    try {
      const res = await fetch(
        BASE_URL + "/api/ecommerce/wishlist/" + productId,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const wishlist = await res.json();
      console.log(wishlist);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5 md:mt-16">
      <div className="md:hidden">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between gap-2 items-center border-b py-4  text-gray-500"
          >
            <Image
              src={getImageUrl(product.thumbnail, "products")}
              width={80}
              height={80}
              alt={product.title}
              className="w-20 h-20 object-cover border"
            />
            <div>
              <p>{product.title}</p>
              <p className="flex gap-3 text-lg">
                <span className="font-bold">${product.salePrice}</span>
                <span className="line-through font-light font-gray-400">
                  ${product.regularPrice}
                </span>
              </p>
              <p className="text-green-500 capitalize">
                {product.stockStatus.replace("-", " ")}
              </p>
            </div>
            <div className="flex flex-col justify-end gap-8 items-end">
              <button
                onClick={() => wishlistDeleteHandler(product._id)}
                className="text-gray-500 hover:text-red-500"
              >
                <Icon
                  icon="material-symbols:delete-rounded"
                  width="24"
                  height="24"
                />
              </button>
              <Button
                onClick={() => handleAddtoCart(product._id)}
                className="hover:bg-teal uppercase rounded-full text-xs"
              >
                {isAdded ? "added..." : "add to cart"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <div className="grid grid-cols-[1fr_150px_150px_180px]  items-center py-5 border-b">
          <h5 className="text-lg font-medium">Product</h5>
          <h5 className="text-lg font-medium">Unit price</h5>
          <h5 className="text-lg font-medium">Stock status</h5>
          <h5></h5>
        </div>

        {products.map((product) => (
          <div
            key={product._id}
            className="border-b grid md:grid-cols-[1fr_150px_150px_180px] items-center py-4"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <Image
                src={getImageUrl(product.thumbnail, "products")}
                width={80}
                height={80}
                alt={product.title}
                className="w-20 h-20 object-cover border"
              />
              <p>{product.title}</p>
            </div>
            <p className="flex gap-3 text-lg">
              <span className="font-bold">${product.salePrice}</span>
              <span className="line-through text-gray-400 font-light">
                ${product.regularPrice}
              </span>
            </p>
            <p className="text-green-500 capitalize">
              {product.stockStatus.replace("-", " ")}
            </p>
            <div className="flex justify-end gap-8 items-center">
              <Button
                onClick={() => handleAddtoCart(product._id)}
                className="hover:bg-teal uppercase rounded-full text-xs"
              >
                {isAdded ? "added..." : "add to cart"}
              </Button>
              <button
                onClick={() => wishlistDeleteHandler(product._id)}
                className="text-gray-500 hover:text-red-500"
              >
                <Icon
                  icon="material-symbols:delete-rounded"
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

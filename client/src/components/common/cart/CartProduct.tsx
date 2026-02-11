"use client"; // Required for Next.js 13+ App Router
import { CartItemType } from "@/types/Cart";
import { BASE_URL } from "@/utils/envVariable";
import { getImageUrl } from "@/utils/getImageUrl";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CartProduct = ({ item }: { item: CartItemType }) => {
  const router = useRouter();
  const cartHandler = async (
    type: "increament" | "decreament",
    productId: string,
    quantity: number,
  ) => {
    try {
      const res = await fetch(BASE_URL + "/api/ecommerce/cart/" + productId, {
        method: "PUT",
        body: JSON.stringify({
          quantity: type === "increament" ? quantity + 1 : quantity - 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const cart = await res.json();
      console.log(cart);
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };
  const cartDeleteHandler = async (productId: string) => {
    try {
      const res = await fetch(BASE_URL + "/api/ecommerce/cart/" + productId, {
        method: "DELETE",
        credentials: "include",
      });
      const cart = await res.json();
      console.log(cart);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-2xl max-w-xl relative border border-gray-100 shadow-sm">
      {/* Product Image - Scaled down */}
      <div className="w-24 h-24 bg-[#E9ECEF] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 relative">
        <Image
          src={getImageUrl(item.product.thumbnail, "products")}
          alt={item.product.title}
          className="object-cover w-full h-full absolute"
          width={100}
          height={100}
        />
      </div>

      {/* Product Details - Mini Text */}
      <div className="flex-grow pr-10">
        <h3 className="text-xs font-bold text-gray-900 leading-tight">
          {item?.product?.title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {item?.product?.category}
        </p>

        <div className="mt-2">
          <p className="text-gray-400 line-through text-xs">
            ${item?.product?.regularPrice}
          </p>
          <p className="text-[#FF4D00] text-xs font-bold">
            ${item?.product?.salePrice}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between h-full absolute right-3 py-1">
        <button
          onClick={() => cartDeleteHandler(item.product._id)}
          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          <X size={12} className="text-gray-600" />
        </button>

        {/* State-controlled Quantity Counter */}
        <div className="flex items-center bg-white border border-gray-100 rounded-full p-0.5 shadow-sm mt-auto">
          <button
            onClick={() =>
              cartHandler("decreament", item.product._id, item.quantity)
            }
            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Minus size={12} />
          </button>

          <span className="px-3 text-sm font-semibold min-w-[24px] text-center">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              cartHandler("increament", item.product._id, item.quantity)
            }
            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

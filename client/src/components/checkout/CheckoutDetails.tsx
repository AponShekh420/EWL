"use client";
import { CartType } from "@/types/Cart";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import ScrollArea from "../common/ScrollArea";
import { Checkbox } from "../ui/checkbox";

export default function CheckoutDetails({ cart }: { cart: CartType }) {
  const deleveryCharge = 15;
  const discount = 20;
  const discountPrice = (price: number, discount: number) => {
    return (price * discount) / 100;
  };
  return (
    <div className="px-8 py-20 bg-teal/5 mt-14 lg:mt-0 rounded-t-xl ">
      <div className="max-w-[450px] mx-auto">
        <h4 className="font-bold text-xl">Review your cart</h4>
        <div className="mt-8">
          <ScrollArea className="h-80">
            {cart?.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 bg-[#E9ECEF] rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={getImageUrl(item.product.thumbnail, "products")}
                    alt="Keyboard"
                    className="object-cover w-full h-full absolute"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h5 className="font-medium text-sm text-wrap">
                    {item?.product.title}
                  </h5>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-medium mt-1">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="space-y-4 mt-10">
          <div className="flex justify-between">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-bold">${cart.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Discount (-{discount}%)</span>
            <span className="font-bold text-red-500 ">
              -${discountPrice(cart.totalPrice, discount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Delivery fee</span>
            <span className="font-bold">${deleveryCharge}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="font-bold">
              $
              {cart.totalPrice +
                deleveryCharge -
                discountPrice(cart.totalPrice, discount)}
            </span>
          </div>
          <div className="flex items-center pt-8">
            <Checkbox className="size-5 border-black" />
            <p className="ml-2 inline-block">
              I agree to the terms and conditions
            </p>
          </div>
          <button className="w-full mt-15 rounded-4xl uppercase flex justify-center items-center gap-2 bg-teal text-white py-3 px-5 text-sm font-medium hover:bg-teal/80 transition">
            Pay Now <Icon icon="cil:arrow-right" width="20" height="20" />
          </button>
        </div>
        <div className="mt-10 text-gray-600">
          <div className="flex gap-3 items-center">
            <Icon icon="f7:lock-shield-fill" width="28" height="28" />
            <h5 className="text-lg font-bold ">
              Secure Checkout - SSL Encrypted
            </h5>
          </div>
          <p className="mt-2">
            Ensuring your payment information is secure and protected during
            every transaction.
          </p>
        </div>
      </div>
    </div>
  );
}

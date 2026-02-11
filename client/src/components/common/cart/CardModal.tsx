"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { CartType } from "@/types/Cart";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "./CartProduct";

export default function CartModal({ cart }: { cart: CartType }) {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.cart.isCartModalShow);

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(value: boolean) =>
          dispatch(addToCart({ isCartModalShow: value }))
        }
      >
        <SheetContent className="w-full sm:max-w-[420px]">
          <SheetHeader>
            <SheetTitle className="text-xl text-teal">Your Cart</SheetTitle>
          </SheetHeader>

          <div className="grid gap-4 py-4 px-4 w-full max-h-full overflow-y-auto">
            {cart.items.map((item, index) => (
              <CartProduct key={index} item={item} />
            ))}
          </div>

          <SheetFooter className="border-t-2">
            <div className="w-full">
              <p className="text-sm text-gray-500 flex justify-between">
                Total Items: <span>{cart.totalProduct}</span>
              </p>
              <p className="text-sm text-gray-500 flex justify-between">
                Shipping: <span>${50}.00</span>
              </p>
              <p className="text-sm text-gray-500 flex justify-between">
                Tax: <span>$12.00</span>
              </p>
              <p className="text-lg font-semibold text-teal flex justify-between">
                Total Price: <span>${cart.totalPrice + 50 + 12}</span>
              </p>
            </div>
            <Button
              className="py-5"
              onClick={() => {
                // dispatch async thunk here
                dispatch(addToCart({ isCartModalShow: false }));
              }}
            >
              <Link href="/cart" className="w-full">
                Cart
              </Link>
            </Button>

            <SheetClose asChild>
              <Button
                variant="outline"
                className="bg-teal text-white py-5"
                onClick={() => dispatch(addToCart({ isCartModalShow: false }))}
              >
                <Link href="/checkout" className="w-full">
                  Checkout
                </Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

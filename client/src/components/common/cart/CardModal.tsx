"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/redux/features/cart/cartSlice"
import CartProduct from "./CartProduct"
import Link from "next/link"



export default function CartModal() {
  const dispatch = useDispatch();
  const open = useSelector(
    (state: RootState) => state.cart.isCartModalShow
  );

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
            <CartProduct/>
            <CartProduct/>
            <CartProduct/>
            <CartProduct/>
            <CartProduct/>
            <CartProduct/>
            <CartProduct/>
          </div>

          <SheetFooter className="border-t-2">
            <div className="w-full">
              <p className="text-sm text-gray-500 flex justify-between">Total Items: <span>7</span></p>
              <p className="text-sm text-gray-500 flex justify-between">Shipping: <span>$10.00</span></p>
              <p className="text-sm text-gray-500 flex justify-between">Tax: <span>$12.00</span></p>
              <p className="text-lg font-semibold text-teal flex justify-between">Total Price: <span>$150.00</span></p>
            </div>
            <Button
              className="py-5"
              onClick={() => {
                // dispatch async thunk here
                dispatch(addToCart({ isCartModalShow: false }))
              }}
            >
              <Link href="/cart" className="w-full">Cart</Link>
            </Button>

            <SheetClose asChild>
              <Button
                variant="outline"
                className="bg-teal text-white py-5"
                onClick={() => dispatch(addToCart({ isCartModalShow: false }))}
              >
                <Link href="/checkout" className="w-full">Checkout</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

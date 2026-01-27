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
        <SheetContent>
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

          <SheetFooter>
            <Button
              className="py-5"
              onClick={() => {
                // dispatch async thunk here
                dispatch(addToCart({ isCartModalShow: false }))
              }}
            >
              View Cart
            </Button>

            <SheetClose asChild>
              <Button
                variant="outline"
                className="bg-teal text-white py-5"
                onClick={() => dispatch(addToCart({ isCartModalShow: false }))}
              >
                Checkout
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

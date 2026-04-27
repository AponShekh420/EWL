'use client';
import CartListTable from "@/components/common/cart/CartListTable";
// import { RootState } from "@/redux/store";
import { CartType } from "@/types/Cart";
import { Icon } from "@iconify/react";
import Link from "next/dist/client/link";
// import { useSelector } from "react-redux";



const CartDetails = ({ cart }: { cart: CartType }) => {
    // const {shippingAndTaxDetails, shipping} = useSelector((state: RootState) => state.checkout);
    

    return (
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_400px] gap-x-8 mt-12 items-start">
          <div className="space-y-2">
            <CartListTable cart={cart} />
          </div>
          <div className="px-6 py-6 border shadow rounded-lg">
            <h5 className="text-lg font-bold capitalize mb-6">order summary</h5>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-bold">${cart.totalPrice}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="font-bold">${shipping.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax</span>
                <span className="font-bold">${shippingAndTaxDetails.tax}</span>
              </div> */}
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="font-bold">${
              (
                Number(cart.totalPrice)
              ).toFixed(2)
              }</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full mt-15 rounded-4xl uppercase flex justify-center items-center gap-2 bg-black text-white py-3 px-5 text-sm font-medium hover:bg-gray-800 transition"
            >
              Go to Checkout{" "}
              <Icon icon="cil:arrow-right" width="20" height="20" />
            </Link>
          </div>
        </div>
    );
}

export default CartDetails;
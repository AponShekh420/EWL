"use client";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import ScrollArea from "../common/ScrollArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
CardElement,
useStripe,
useElements
}
from "@stripe/react-stripe-js";
import { BASE_URL } from "@/utils/envVariable";
import toast from "react-hot-toast";
import { ClassCartType } from "@/types/ClassCart";
import { addClassCheckoutField, resetClassCheckoutFields } from "@/redux/features/checkout/classCheckoutFormSlice";
import getClassOrderRequestData from "@/lib/getClassOrderRequestData";
// import { useRouter } from "next/navigation";



export default function CheckoutDetails({ cart }: { cart: ClassCartType }) {
  const dispatch = useDispatch();
  const checkoutForm = useSelector((state: RootState) => state.classCheckout);
  // const router = useRouter();

  const stripe=useStripe();
  const elements=useElements();


  const [saveCard,setSaveCard]= useState(false);

  const [loading,setLoading]= useState(false);


  const submitOrder= async(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    dispatch(addClassCheckoutField({errors: {}}))
    const requestData = getClassOrderRequestData(cart, checkoutForm)

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet. Please try again.");
      return;
    }
    setLoading(true);

    const orderRes= await fetch(BASE_URL + "/api/e-learning/class-order/create-order",
      {
        method:"POST",
        headers:{
        "Content-Type": "application/json",
        },
        credentials: "include",
        body:JSON.stringify(requestData)
      }
    );
    const data= await orderRes.json();
    if(data.errors) {
      console.log(data.errors)
      dispatch(addClassCheckoutField({errors:  {
        ...data.errors,
      }}));
      setLoading(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      await fetch(BASE_URL + "/api/e-learning/class-orders/" + data?.orderId,
        {
          method:"DELETE",
          headers:{
          "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      toast.error("Card input is not available. Please try again.")
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: `${checkoutForm.fullName}`,
            email: checkoutForm.email
          }
        },
        setup_future_usage: saveCard ? "off_session" : undefined
      }
    );

    if(result.error){
      await fetch(BASE_URL + "/api/e-learning/class-orders/" + data?.orderId,
        {
          method:"DELETE",
          headers:{
          "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      toast.error(result.error.message || "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    if(result.paymentIntent.status=== "succeeded"){
      dispatch(resetClassCheckoutFields())
      toast.success("Paid successfully");
      setTimeout(()=> {
        window.location.replace("/profile/my-classes")
      }, 3000)
    }
    setLoading(false);
  };

  useEffect(()=> {
    console.log("cart apon:", cart)
  }, [cart])


  return (
    <div className="px-8 py-20 bg-teal/5 mt-14 lg:mt-0 rounded-t-xl ">
      <div className="max-w-[450px] mx-auto relative">
        {/* loading */}
        {checkoutForm.loading && (
          <div className="w-full h-full bg-[#F4F9FC] absolute z-10 opacity-50 flex items-center justify-center">
            <Icon icon="eos-icons:bubble-loading" width="40" height="40" />
          </div>
        )}
        {/* loading */}
        <h4 className="font-bold text-xl">Review your cart</h4>
        <div className="mt-8">
          <ScrollArea className="h-80">
            {cart?.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-2 relative">
                <div className="w-16 h-16 bg-[#E9ECEF] rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={getImageUrl(item.class.thumbnail, "classes")}
                    alt="Keyboard"
                    className="object-cover w-full h-full absolute"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h5 className="font-medium text-sm text-wrap">
                    {item?.class.title}
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
            <span className="text-gray-800 font-semibold">Subtotal:</span>
            <span className="font-bold">${cart.totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-800 font-semibold cursor-default">Total</span>
            <span className="font-bold">
              ${
              (Number(cart.totalPrice)).toFixed(2)
              }
            </span>
          </div>

          <form onSubmit={submitOrder}>
            {/* payment form */}
            <div className="bg-[#DCD7E2] py-5 px-5 rounded-md">
              <p className="font-semibold text-md capitalize mb-1">debit/credit card</p>
              <div className="border-1 border-white p-2 mt-8">
                <CardElement
                  options={{
                  hidePostalCode:true,
                  style: {
                      base: {
                        fontSize: "16px",
                        padding: "10px",
                        color: "#111827",
                        fontFamily: "Inter, sans-serif",

                        "::placeholder": {
                          color: "#575757"
                        }
                      },

                      invalid: {
                        color: "#dc2626",
                        iconColor: "#dc2626"
                      }
                    }
                  }}
                />
              </div>

              {/* <div className="grid grid-cols-2 gap-4 mt-8">
                <CardNumberElement className="border-2 col-span-2 p-2"/>
                <CardExpiryElement className=""/>
                <CardCvcElement />
              </div> */}
              <label className="flex gap-2 mt-2">
                <input
                type="checkbox"
                checked={saveCard}
                onChange={()=>
                setSaveCard(
                !saveCard
                )}
                />

                Save payment info
              </label>
            </div>
            {/* payment form end */}

            <button disabled={loading} className={`w-full mt-15 rounded-4xl uppercase flex justify-center items-center gap-2 bg-teal text-white py-3 px-5 text-sm font-medium hover:bg-teal/80 transition disabled:bg-gray-400 disabled:cursor-not-allowed`} >
              {loading
                ? "Processing..."
                : "Place Order"
              } <Icon icon="cil:arrow-right" width="20" height="20" />
            </button>
          </form>
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

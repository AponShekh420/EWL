"use client";
import { CartType } from "@/types/Cart";
import { getImageUrl } from "@/utils/getImageUrl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import ScrollArea from "../common/ScrollArea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addCheckoutField } from "@/redux/features/checkout/checkoutFormSlice";
import { Badge } from "@/components/ui/badge";
import {
CardElement,
useStripe,
useElements
}
from "@stripe/react-stripe-js";
import { BASE_URL } from "@/utils/envVariable";
import getOrderRequestData from "@/lib/getOrderRequestData";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



interface ServiceLevel {
  name: string;
  terms: string;
  token: string;
  extendedToken: string;
}

interface UspsShippingRate {
  amount: string; // Shippo returns money as string
  amountLocal: string;
  currency: string;
  currencyLocal: string;

  attributes: string[]; // empty array now, but usually strings
  carrierAccount: string;
  durationTerms: string;

  estimatedDays: number;

  messages: unknown[]; // can refine later if Shippo returns structured messages

  objectCreated: string; // ISO date string
  objectId: string;
  objectOwner: string;

  provider: string;
  providerImage75: string;
  providerImage200: string;

  servicelevel: ServiceLevel;

  shipment: string;
  test: boolean;
}

interface ShippingClassRate {
  _id: string;
  shippingCost: number;
}




export default function CheckoutDetails({ cart }: { cart: CartType }) {
  const {shippingAndTaxDetails} = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const checkoutForm = useSelector((state: RootState) => state.checkout);
  const router = useRouter();

  useEffect(() => {
    console.log("Shipping and Tax Details:", checkoutForm.shipping);
   }, [checkoutForm.shipping]);

  const stripe=useStripe();
  const elements=useElements();


  const [saveCard,setSaveCard]= useState(false);

  const [loading,setLoading]= useState(false);


  const submitOrder= async(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    const requestData = getOrderRequestData(cart, checkoutForm)

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet. Please try again.");
      return;
    }
    setLoading(true);

    const orderRes= await fetch(BASE_URL + "/api/ecommerce/order/create-order",
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
    const card = elements.getElement(CardElement);
    if (!card) {
      await fetch(BASE_URL + "/api/ecommerce/orders/" + data?.orderId,
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

    console.log("data stripe:", data)

    const result = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: `${checkoutForm.firstName} ${checkoutForm.lastName}`,
            email: checkoutForm.email
          }
        },
        setup_future_usage: saveCard ? "off_session" : undefined
      }
    );

    if(result.error){
      await fetch(BASE_URL + "/api/ecommerce/orders/" + data?.orderId,
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
      toast.success("Paid successfully");
      setTimeout(()=> {
        router.push("/profile/my-orders")
      }, 3000)
    }
    setLoading(false);
  };

  useEffect(()=> {
    console.log("cart apon:", cart)
  }, [cart])


  return (
    <div className="px-8 py-20 bg-teal/5 mt-14 lg:mt-0 rounded-t-xl ">
      <div className="max-w-[450px] mx-auto">
        <h4 className="font-bold text-xl">Review your cart</h4>
        <div className="mt-8">
          <ScrollArea className="h-80">
            {cart?.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-2 relative">
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
                {(shippingAndTaxDetails?.shipping?.impossibleProducts as string[])?.includes(item.product._id) && (
                  <Badge
                    variant="destructive"
                    className="absolute top-1/2 right-0 -translate-y-1/2"
                  >
                    Not Shippable
                  </Badge>
                )}

                {(
                  shippingAndTaxDetails.shipping?.shippingClassRates as ShippingClassRate[] | undefined
                )
                  ?.filter((p) => p._id === item.product._id)
                  .map((p, index) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="absolute top-1/2 right-0 -translate-y-1/2"
                    >
                      {p.shippingCost.toFixed(2) === "0.00"
                        ? "Free Shipping"
                        : `$${p.shippingCost.toFixed(2)} Fixed Shipping`}
                    </Badge>
                  ))}
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
            <span className="text-gray-800 font-semibold text-semibold">Tax:</span>
            <span className="font-bold text-red-500 ">
              {shippingAndTaxDetails.tax}
            </span>
          </div>

          {/* shipping */}
          <div className="flex justify-between">
            <FieldSet className="w-full max-w-xs">
              <p className="text-gray-800 font-semibold cursor-default">Shipping:</p>
              <FieldDescription>
                Select delivery options based on destination and speed.
              </FieldDescription>
              <RadioGroup
                value={checkoutForm.shipping?.servicelevel || checkoutForm.shipping?.methodName || ""}
              >
                {shippingAndTaxDetails?.shipping?.usps?.rates?.map(
                  (option: UspsShippingRate, index: number) => (
                    <Field orientation="horizontal" key={index}>
                      <RadioGroupItem
                        value={option.servicelevel.name}
                        id={`usps-${index}`}
                        onClick={() =>
                          dispatch(
                            addCheckoutField({
                              shipping: {
                                methodName: "usps",
                                cost: option.amount,
                                boxUsed: shippingAndTaxDetails.shipping.usps.boxUsed || "",
                                finalWeightOz: shippingAndTaxDetails.shipping.usps.finalWeightOz || 0,
                                servicelevel: option.servicelevel.name,
                              },
                            })
                          )
                        }
                      />

                      <FieldContent>
                        <FieldLabel
                          htmlFor={`usps-${index}`}
                          className="text-normal text-gray-800"
                        >
                          {option.provider} - {option.servicelevel.name}
                          <span className="font-semibold">
                            (${option.amount})
                          </span>
                        </FieldLabel>

                        <FieldDescription>
                          {option.durationTerms}
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  )
                )}

                {shippingAndTaxDetails?.shipping?.localPickup ? (
                  <Field orientation="horizontal">
                    <RadioGroupItem
                      value="localPickup"
                      id="localPickup"
                      onClick={() =>
                        dispatch(
                          addCheckoutField({
                            shipping: {
                              methodName: "localPickup",
                              cost: 0,
                            },
                          })
                        )
                      }
                    />

                    <FieldContent>
                      <FieldLabel htmlFor="localPickup">
                        Local Pickup
                      </FieldLabel>
                    </FieldContent>
                  </Field>
                ): (<></>)}

                {shippingAndTaxDetails?.shipping?.flatRate ? (
                  <Field orientation="horizontal">
                    <RadioGroupItem
                      value="flatRate"
                      id="flatRate"
                      onClick={() =>
                        dispatch(
                          addCheckoutField({
                            shipping: {
                              methodName: "flatRate",
                              cost: shippingAndTaxDetails.shipping.flatRate,
                            },
                          })
                        )
                      }
                    />

                    <FieldContent>
                      <FieldLabel htmlFor="flatRate">
                        Flat Rate
                        <span className="font-semibold">
                          (${shippingAndTaxDetails.shipping.flatRate})
                        </span>
                      </FieldLabel>
                    </FieldContent>
                  </Field>
                ) : (<></>)}
              </RadioGroup>
            </FieldSet>
          </div>
          {/* shipping end */}

          <div className="flex justify-between">
            <span className="text-gray-800 font-semibold cursor-default">Total</span>
            <span className="font-bold">
              ${
              (
                Number(cart.totalPrice) +
                Number(shippingAndTaxDetails.tax) +
                Number(checkoutForm.shipping?.cost || 0) +
                Number(
                  (
                    shippingAndTaxDetails.shipping
                      ?.shippingClassRates as ShippingClassRate[] | undefined
                  )?.reduce((total, rate) => total + rate.shippingCost, 0) || 0
                )
              ).toFixed(2)
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

            <button disabled={loading || ((checkoutForm?.shippingAndTaxDetails?.shipping?.impossibleProducts?.length > 0) || ((cart?.items.length > checkoutForm?.shippingAndTaxDetails?.shipping?.shippingClassRates.length) && !checkoutForm?.shipping.methodName))} className={`w-full mt-15 rounded-4xl uppercase flex justify-center items-center gap-2 bg-teal text-white py-3 px-5 text-sm font-medium hover:bg-teal/80 transition disabled:bg-gray-400 disabled:cursor-not-allowed`} >
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

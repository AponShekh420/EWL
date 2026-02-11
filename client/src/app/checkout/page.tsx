"use client";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import InputBox from "@/components/common/InputBox";
import ScrollArea from "@/components/common/ScrollArea";
import SelectBox from "@/components/common/SelectBox";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function page() {
  return (
    <main className="min-h-screen">
      <section className="container">
        <div>
          <div className="grid lg:grid-cols-2">
            <div className="pr-8 lg:border-r">
              <div className="mt-8 md:mt-12 lg:mt-16">
                <BreadcrumbPath
                  breadcrumbList={[
                    { name: "Home", href: "/" },
                    { name: "Cart", href: "/cart" },
                    { name: "Checkout", href: "/checkout" },
                  ]}
                />
              </div>
              <h2 className="text-4xl font-semibold mt-10 ">Checkout</h2>
              <h5 className="text-xl font-semibold mt-5">
                Shipping information form will go here.
              </h5>
              <form action="" className="mt-10 space-y-8 ">
                <InputBox
                  name="fullname"
                  label="Full name"
                  placeholder="Enter full name"
                />
                <InputBox
                  name="email"
                  label="Email"
                  placeholder="Enter email address"
                />
                <InputBox
                  name="phone"
                  label="Phone number"
                  placeholder="Enter phone number"
                />
                <div>
                  <Label htmlFor="country" className="capitalize mb-4">
                    Country
                  </Label>
                  <SelectBox
                    name=""
                    label=""
                    value={""}
                    className={`w-full `}
                    placeholder="Choose country"
                    onChange={(val) => console.log(val)}
                    options={[
                      { label: "Bangladesh", value: "bangladesh" },
                      { label: "United States", value: "united-states" },
                      { label: "England", value: "england" },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputBox name="city" label="City" placeholder="Enter city" />
                  <InputBox
                    name="state"
                    label="State"
                    placeholder="Enter state"
                  />
                  <InputBox
                    name="zip"
                    label="ZIP Code"
                    placeholder="Enter ZIP code"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <Checkbox className="size-5 border-black" />
                  <p className="ml-2 inline-block">
                    I agree to the terms and conditions
                  </p>
                </div>
              </form>
            </div>

            <div className="px-8 py-20 bg-teal/5 mt-14 lg:mt-0 rounded-t-xl ">
              <div className="max-w-[450px] mx-auto">
                <h4 className="font-bold text-xl">Review your cart</h4>
                <div className="mt-8">
                  <ScrollArea className="h-55">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 bg-[#E9ECEF] rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                          <Image
                            src="/images/home/heart-icon.png"
                            alt="Keyboard"
                            className="object-cover w-full h-full absolute"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-wrap">
                            QwertyKey100 Matrix Hotswap RGB Mechanical Keyboard
                          </h5>
                          <p className="text-sm text-gray-500">Quantity: 1</p>
                          <p className="font-medium mt-1">$100</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div className="space-y-4 mt-10">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-bold">$565</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discount (-20%)</span>
                    <span className="font-bold text-red-500 ">-$113</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery fee</span>
                    <span className="font-bold">$15</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold">$467</span>
                  </div>
                  <button className="w-full mt-15 rounded-4xl uppercase flex justify-center items-center gap-2 bg-teal text-white py-3 px-5 text-sm font-medium hover:bg-teal/80 transition">
                    Pay Now{" "}
                    <Icon icon="cil:arrow-right" width="20" height="20" />
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
                    Ensuring your payment information is secure and protected
                    during every transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

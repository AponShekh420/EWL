"use client";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OrderType } from "@/types/Order";
import { GetTime } from "@/utils/getTime";
import Image from "next/image";
import { useState } from "react";
export default function OrderForm({ order }: { order: OrderType }) {
  const [isSippingShow, setIsSippingShow] = useState(false);
  return (
    <div>
      <form className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 lg:gap-4 xl:gap-8 2xl:gap-16">
        <div className="order-2 lg:order-1">
          {/* billing Information */}
          <h1 className="my-8 font-bold text-2xl">Billing Information</h1>
          <div>
            <div className="grid sm:grid-cols-2 gap-8">
              <InputBox
                label="Customer Name"
                placeholder="Customer Name"
                name="customer-name"
              />
              <InputBox
                label="Phone Number"
                placeholder="Phone Number"
                name="Phone-number"
              />
              <InputBox label="Country" placeholder="Country" name="country" />
              <InputBox label="State" placeholder="State" name="state" />
              <InputBox label="City" placeholder="City" name="city" />
              <InputBox
                label="Zip/Postcode"
                placeholder="Zip/Postcode"
                name="Zip"
              />
            </div>
            <div className="mt-8">
              <InputBox
                label="Street Address"
                placeholder="Street Address"
                name="street-address"
              />
              <div className="flex items-center gap-2 mt-8">
                <Checkbox
                  className="checkbox-t"
                  onCheckedChange={(e) => setIsSippingShow(e === true)}
                />
                <Label>Shipping Address is the same as Billing Address</Label>
              </div>
            </div>
          </div>

          {/* shipping Information */}
          <div className={`mt-10 ${isSippingShow ? "block" : "hidden"}`}>
            <h1 className="my-8 font-bold text-2xl">Shipping Information</h1>
            <div className="grid sm:grid-cols-2 gap-8">
              <InputBox
                label="Customer Name"
                placeholder="Customer Name"
                name="customer-name"
              />
              <InputBox
                label="Phone Number"
                placeholder="Phone Number"
                name="Phone-number"
              />
              <InputBox label="Country" placeholder="Country" name="country" />
              <InputBox label="State" placeholder="State" name="state" />
              <InputBox label="City" placeholder="City" name="city" />
              <InputBox
                label="Zip/Postcode"
                placeholder="Zip/Postcode"
                name="Zip"
              />
            </div>
            <div className="mt-8">
              <InputBox
                label="Street Address"
                placeholder="Street Address"
                name="street-address"
              />
            </div>
          </div>
          <hr className="my-8" />
          <div>
            <TextBox
              label="Order Note (optional)"
              name="order-note"
              className="min-h-24"
              placeholder="Notes about your order, e.g special note for delivery"
            />
          </div>

          <Button className="ml-auto w-fit block my-8" variant="blue">
            Submit
          </Button>
        </div>
        <div className="shadow border rounded-md px-5 py-5 lg:px-8 lg:py-8 order-1 lg:order-2 mt-8 lg:mt-0">
          <h5 className="font-bold text-lg font-lexend-deca">Customer Info</h5>
          <div className="flex flex-col xl:flex-row gap-4 mt-8">
            <Image
              src={order?.avatar}
              width={80}
              height={80}
              alt="customer"
              className="rounded-xl"
            />
            <div className="space-y-2">
              <h5 className="font-lexend-deca font-medium">{order.name}</h5>
              <p className="text-sm text-gray-500">{order.email}</p>
              <p className="text-gray-500 text-sm">(316) 555-0116</p>
            </div>
          </div>
          <hr className="my-8" />
          <h5 className="font-bold text-lg font-lexend-deca">Order Details</h5>
          <div>
            <p className="text-sm py-1.5">Order ID</p>
            <p className="font-medium">OD-{order.id}</p>
          </div>
          <hr className="my-8" />
          <div className="space-y-5">
            <SelectBox
              name="payment-method"
              label="Payment Method"
              value="paypal"
              onChange={(val) => console.log("Selected:", val)}
              options={[
                { label: "Paypal", value: "paypal" },
                { label: "Grocery", value: "grocery" },
                { label: "Meat", value: "meat" },
                { label: "Cat Food", value: "cat-food" },
              ]}
            />
            <SelectBox
              name="shipping-method"
              label="Shipping Method"
              value="usps"
              onChange={(val) => console.log("Selected:", val)}
              options={[
                { label: "USPS", value: "usps" },
                { label: "Grocery", value: "grocery" },
                { label: "Meat", value: "meat" },
                { label: "Cat Food", value: "cat-food" },
              ]}
            />
            <div>
              <h5 className="text-sm font-medium">Order Date</h5>
              <p className="mt-4 border px-3 py-2 rounded-md">
                {GetTime(new Date(order.createdAt))}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import { JSX } from "react";
import { ProductType } from "./Product";

type Customer = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: "admin" | "viewer" | "seller" | "speaker";
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  isOrthodoxJew: boolean;
  maritalStatus: string;
  keepsMitzvos: boolean;
  chafifaDuration: string;
  chickenSoupInDairySink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ProductsPros = {
  length: number;
  map(arg0: (productInfo: OrderedProductType, index: number) => JSX.Element): import("react").ReactNode;
  quantity: number,
  price: number,
  _id: ProductType,
}



type ShippingClassRates = {
  shippingCost: number;
  _id: string,
};

type ShippingDetails = {
  methodName: string;
  cost: number;
  boxUsed: string;
  finalWeightOz: number;
  servicelevel: string;
};

type DifferentBillingAddress = {
  firstName: string;
  lastName: string;
  email: string;
  spouseName: string;

  phoneNumber: string;
  otherPhoneNumber: string;

  country: string;
  state: string;
  city: string;
  zip: string;

  streetAddress: string;
  apartment: string;
};

export type OrderType = {
  orderId: number,
  _id: string,
  customer: Customer
  firstName?: string;
  lastName?: string;
  email?: string;
  spouseName?: string;
  howDidYouHearAboutUs?: string;

  country: string;
  state?: string;
  city?: string;
  zip?: string;

  streetAddress?: string;
  apartment?: string;

  phoneNumber?: string;
  otherPhoneNumber?: string;

  orderNotes?: string;

  isDifferentBillingAddress?: boolean;
  differentBillingAddress?: DifferentBillingAddress;
  tax: number;
  shipping?: ShippingDetails;
  shippingClassRates: ShippingClassRates[],
  totalProduct: number,
  subtotal: number,
  totalPrice: number,
  status: string,
  stripePaymentIntentId: string,
  paymentStatus: string,
  products: ProductsPros[],
  createdAt: string;
  updatedAt: string;
  __v: number;
};



export type OrderedProductType = {
  quantity: number,
  price: number,
  _id: ProductType,
}
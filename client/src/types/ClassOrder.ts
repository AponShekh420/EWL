import { JSX } from "react";
import { ClassType } from "./Class";

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

type ClassesPros = {
  length: number;
  map(arg0: (classInfo: OrderedClassType, index: number) => JSX.Element): import("react").ReactNode;
  quantity: number,
  price: number,
  _id: ClassType,
}


export type ClassOrderType = {
  orderId: number,
  _id: string,
  customer: Customer
  fullName?: string;
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

  totalClass: number,
  subtotal: number,
  totalPrice: number,
  status: string,
  stripePaymentIntentId: string,
  paymentStatus: string,
  classes: ClassesPros[],
  createdAt: string;
  updatedAt: string;
  __v: number;
};


type ClassesCardPros = {
  _id: {
    _id: string;
    slug: string;
    title: string;
    thumbnail: string;
    speaker:{ firstName: string; lastName: string; gender: string, avatar: string, userName: string };
  };
  quantity: number;
  price: number;
}


export type ClassOrderCardType = {
  orderId: number,
  _id: string,
  customer: Customer
  fullName?: string;
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

  totalClass: number,
  subtotal: number,
  totalPrice: number,
  status: string,
  stripePaymentIntentId: string,
  paymentStatus: string,
  classes: ClassesCardPros[],
  createdAt: string;
  updatedAt: string;
  __v: number;
};



export type OrderedClassType = {
  quantity: number,
  price: number,
  _id: ClassType,
}
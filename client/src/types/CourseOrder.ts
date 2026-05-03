import { JSX } from "react";
import { CourseType } from "./Course";

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

type CoursesPros = {
  length: number;
  map(arg0: (courseInfo: OrderedCourseType, index: number) => JSX.Element): import("react").ReactNode;
  quantity: number,
  price: number,
  _id: CourseType,
}


export type CourseOrderType = {
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

  totalCourse: number,
  subtotal: number,
  totalPrice: number,
  status: string,
  stripePaymentIntentId: string,
  paymentStatus: string,
  courses: CoursesPros[],
  createdAt: string;
  updatedAt: string;
  __v: number;
};




type CoursesCardPros = {
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


export type CourseOrderCardType = {
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

  totalCourse: number,
  subtotal: number,
  totalPrice: number,
  status: string,
  stripePaymentIntentId: string,
  paymentStatus: string,
  courses: CoursesCardPros[],
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export type OrderedCourseType = {
  quantity: number,
  price: number,
  _id: CourseType,
}
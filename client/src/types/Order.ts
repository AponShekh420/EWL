import { ProductType } from "./Product";

type AddressInfo = {
  customerName: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  streetAddress: string;
};

type PaymentInfo = {
  paymentMethod: "paypal" | "stripe" | "cod";
  shippingMethod: "local" | "international";
  orderDate: string; // ISO date string
};

type Customer = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: "admin" | "viewer" | "seller";
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

export type OrderType = {
  _id: string;
  orderId: number;

  billingInfo: AddressInfo;
  shippingInfo: AddressInfo;
  paymentInfo: PaymentInfo;

  products: ProductType[];
  customer: Customer;

  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalProduct: number;
  totalPrice: number;

  orderNote: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
};

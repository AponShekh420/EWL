import { ProductType } from "./Product";
export type CartItemType = {
  price: number;
  product: ProductType;
  quantity: number;
};
export type CartType = {
  customer: string;
  createdAt: Date;
  totalPrice: number;
  totalProduct: number;
  _id: string;
  items: CartItemType[];
};

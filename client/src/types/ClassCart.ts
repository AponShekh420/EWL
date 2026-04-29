import { ClassType } from "./Class";
export type ClassCartItemType = {
  price: number;
  class: ClassType;
  quantity: number;
};
export type ClassCartType = {
  createdAt: Date;
  totalPrice: number;
  totalClass?: number;
  _id: string;
  items: ClassCartItemType[];
};

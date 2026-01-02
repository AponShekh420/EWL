import { OrderType } from "@/types/Order";

export const totalProductAmount = (products: OrderType[]) => {
  return products.reduce((acc, curr) => {
    return acc + Number(curr.price) * Number(curr.quantity);
  }, 0);
};

export const totalProductCount = (products: OrderType[]) => {
  return products.reduce((acc, curr) => {
    return acc + Number(curr.quantity);
  }, 0);
};

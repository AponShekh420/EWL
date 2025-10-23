import { OrderProductT } from "@/types/Order";

export const totalProductAmount = (products: OrderProductT[]) => {
  return products.reduce((acc, curr) => {
    return acc + Number(curr.price) * Number(curr.quantity);
  }, 0);
};

export const totalProductCount = (products: OrderProductT[]) => {
  return products.reduce((acc, curr) => {
    return acc + Number(curr.quantity);
  }, 0);
};

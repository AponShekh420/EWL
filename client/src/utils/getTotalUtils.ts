import { OrderType } from "@/types/Order";

export const totalProductAmount = (order: OrderType) => {
  return order?.products?.reduce((acc, curr) => {
    return acc + Number(curr.price) * Number(curr.quantity);
  }, 0);
};

export const totalProductCount = (order: OrderType) => {
  return order.products.reduce((acc, curr) => {
    return acc + Number(curr.quantity);
  }, 0);
};

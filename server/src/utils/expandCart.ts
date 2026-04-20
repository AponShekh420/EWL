// utils/expandCart.js
export const expandCart = (cart: { weight: number; length: number; width: number; height: number; qty: number }[]) => {
  return cart.flatMap(item =>
    Array(item.qty).fill({
      weight: item.weight,
      length: item.length,
      width: item.width,
      height: item.height
    })
  );
};
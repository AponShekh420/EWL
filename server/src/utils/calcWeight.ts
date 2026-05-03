// utils/calcWeight.js
export const getTotalWeight = (items: { weight: number }[]) =>
  items.reduce((sum, item) => sum + item.weight, 0);
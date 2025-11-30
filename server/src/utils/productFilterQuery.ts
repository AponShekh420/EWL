import { Request } from "express";
type TQuery = {
  title?: string;
  category?: string;
  stockStatus?: string;
  priceMax?: number;
  priceMin?: number;
  stock?: number;
};

type TProductQuery = {
  title?: string | { $regex: string; $options: string };
  category?: string;
  stockStatus?: string;
  salePrice?: number | { $gte: number; $lte: number };
  stock?: number;
};
export const productFilterQuery = (req: Request) => {
  const { title, category, stockStatus, stock, priceMax, priceMin } =
    req.query as unknown as TQuery;
  let queryObject = {} as TProductQuery;

  if (title) {
    queryObject.title = { $regex: title as string, $options: "i" };
  }
  if (category) {
    queryObject.category = category;
  }
  if (stockStatus) {
    queryObject.stockStatus = stockStatus;
  }
  if (stock) {
    queryObject.stock = stock;
  }
  if (priceMax) {
    queryObject.salePrice = { $gte: 0, $lte: priceMax };
  }
  if (priceMin) {
    queryObject.salePrice = { $gte: priceMin, $lte: 100000 };
  }
  return queryObject;
};

import { Types } from "mongoose";

export interface IProduct {
  creator: Types.ObjectId;
  title: string;
  category: string;
  productTags: string[];
  shortDescription: string;
  description: string;
  thumbnail: string;
  images: string[];
  sku: string;
  isbn: string;
  regularPrice: number;
  salePrice: number;
  stock: number;
  stockStatus: string;
  isVisibleProductPage: boolean;
  trackStockQuantity: boolean;
  limitOneItemPerOrder: boolean;
  weight: string;
  declaredValue: number;
  dimensionLength: string;
  dimensionWidth: string;
  dimensionHeight: string;
  taxStatus: string;
  taxClass: string;
  shippingClass: string;
  enelope: boolean;
  customMessage: string;
  attachment: string;
  checkoutPageMessage: string;
  metaData: string;
  metaDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}

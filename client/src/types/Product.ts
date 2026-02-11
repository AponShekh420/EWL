import { UserType } from "./User";

export interface ProductReviewType {
  _id: string;
  product: ProductType;
  review: string;
  customer: UserType;
  status: string | undefined;
  rating: number;
  createdAt: Date;
}
export type ProductType = {
  name: string;
  _id: string;
  title: string;
  category: string;
  thumbnail: string;
  sku: string;
  stock: number;
  salePrice: number;
  regularPrice: number;
  tags: string[];
  status: string;
  reviews: ProductReviewType[];
  slug: string;
  attachment: string;
  images: string[];
  shortDescription: string;
  description: string;
  dimensionLength: number;
  dimensionHeight: number;
  dimensionWidth: number;
  weight: number;
  stockStatus: string;
};

export type ProductFormState = {
  // 1st tab
  title: string;
  category: string;
  slug: string;
  tags: string;
  shortDescription: string;
  description: string;

  // 2nd tab
  thumbnail: File | null;
  images: File[] | null;
  existingThumbnail?: string;
  existingAttachment?: string;
  existingImages?: string[];
  deletedImages?: string[];

  // 3rd tab
  sku: string;
  isbn: string;
  regularPrice: string;
  salePrice: string;
  stock: string;
  stockStatus: string;
  isVisibleProductPage: boolean;
  trackStockQuantity: boolean;
  limitOneItemPerOrder: boolean;

  // 4th tab
  weight: string;
  declaredValue: string;
  dimensionLength: string;
  dimensionHeight: string;
  dimensionWidth: string;
  taxStatus: string;
  taxClass: string;
  shippingClass: string;
  enelope: boolean;

  // 5th tab
  customMessage: string;
  attachment: File | null;
  checkoutPageMessage: string;
  metaTitle: string;
  metaDescription: string;
};

//product express validator types errors
type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};

export type ProductValidationErrors = { [key: string]: ValidationErrorItem };

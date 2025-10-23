export type ProductType = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  sku: string;
  stock: number;
  price: string;
  status: string;
  rating: number[];
  slug: string;
  images: string[];
};

interface Customer {
  name: string;
  avatar: string;
}

export interface ProductReviewType {
  id: string;
  product: { name: string; category: string; thumbnail: string };
  review: string;
  customer: Customer;
  status: string | undefined;
  rating: number;
  createdAt: Date;
}

export type ProductFormState = {
  // 1st tab
  title: string;
  category: string;
  tags: string;
  shortDescription: string;
  description: string;

  // 2nd tab
  thumbnail: File | null;
  images: File[] | null;

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
  textStatus: string;
  textClass: string;
  shippingClass: string;
  enelope: boolean;

  // 5th tab
  customMessage: string;
  attachment: File | null;
  checkoutPageMessage: string;
  metaData: string;
  metaDescription: string;
};

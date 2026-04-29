import { ProductType } from "./Product";
export type CourseCartItemType = {
  price: number;
  course: ProductType;
  quantity: number;
};
export type CourseCartType = {
  createdAt: Date;
  totalPrice: number;
  totalCourse?: number;
  _id: string;
  items: CourseCartItemType[];
};

import { CourseType } from "./Course";
export type CourseCartItemType = {
  price: number;
  course: CourseType;
  quantity: number;
};
export type CourseCartType = {
  createdAt: Date;
  totalPrice: number;
  totalCourse?: number;
  _id: string;
  items: CourseCartItemType[];
};

import { CourseType } from "./Course";
export type CourseCartItemType = {
  price: number;
  course: CourseType;
  quantity: number;
  modulesPrice: number;
};
export type CourseCartType = {
  createdAt: Date;
  totalPrice: number;
  totalCourse?: number;
  _id: string;
  orderId?: string;
  items: CourseCartItemType[];
  modules: {
    name: string;
    price: number;
    id: string;
  }[];
};
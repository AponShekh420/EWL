export type OrderProductT = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  quantity: number;
};
export type OrderType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  items: number;
  price: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  products: OrderProductT[];
};

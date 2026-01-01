export type ReviewType = {
  _id: string;
  product: string;
  customer: string;
  rating: number;
  review: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};

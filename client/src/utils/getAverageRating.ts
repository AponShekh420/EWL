import { ProductReviewType } from "@/types/Product";

export const getAverageRating = (reviews: ProductReviewType[]) => {
  const totalRating = reviews.reduce((prev, current) => {
    const total = prev + current.rating;
    return total;
  }, 0);
  return totalRating / reviews.length;
};

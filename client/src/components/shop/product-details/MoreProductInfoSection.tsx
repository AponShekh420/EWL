"use client";
import Rating from "@/components/common/Rating";
import RatingController from "@/components/common/RatingController";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/types/Product";
import { BASE_URL } from "@/utils/envVariable";
import { GetTime } from "@/utils/getTime";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
export default function MoreProductInfoSection({
  product,
}: {
  product: ProductType;
}) {
  const [reviewsDetail, setReviewsDetail] = useState({
    rating: 3.5,
    review: "",
  });
  const [loading, setLoading] = useState(false);
  const [isShowFull, setIsShowFull] = useState(false);
  const handleReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewsDetail.rating || !reviewsDetail.review) {
      return toast.error("Review Field is Required");
    }
    setLoading(true);
    try {
      const res = await fetch(BASE_URL + "/api/ecommerce/review", {
        method: "POST",
        body: JSON.stringify({ ...reviewsDetail, productId: product._id }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("reviews fetching problem");
      }

      const review = await res.json();
      setLoading(false);
      console.log(review);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error((error as Error)?.message || "An error occurred");
    }
  };
  return (
    <section className="border mt-20">
      <div className="flex gap-2 items-center">
        <div className="flex w-full max-w-full flex-col gap-6">
          <Tabs defaultValue="moreinfo">
            <TabsList className="rounded-none!">
              <TabsTrigger
                className="text-sm  rounded-none uppercase  data-[state=active]:bg-teal
            data-[state=active]:text-white sm:px-8 py-4"
                value="moreinfo"
              >
                more info
              </TabsTrigger>
              <TabsTrigger
                className="text-sm  rounded-none uppercase  data-[state=active]:bg-teal
            data-[state=active]:text-white sm:px-8 py-4"
                value="additional-info"
              >
                Additional info
              </TabsTrigger>
              <TabsTrigger
                className="text-sm  rounded-none uppercase  data-[state=active]:bg-teal
            data-[state=active]:text-white sm:px-8 py-4"
                value="reviews"
              >
                reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="moreinfo">
              <div
                className="p-3 sm:p-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </TabsContent>
            <TabsContent value="additional-info">
              <div className="p-3 sm:p-4">
                <ul className="">
                  <li className="grid grid-cols-[120px_1fr] sm:grid-cols-[200px_1fr] items-center gap-4 border-x border-t p-2.5">
                    <span className="font-semibold ">Weight</span>{" "}
                    <span> {product.weight} lbs</span>
                  </li>
                  <li className="grid grid-cols-[112px_1fr] sm:grid-cols-[200px_1fr] items-center gap-4 border-x border-y p-2.5">
                    <span className="font-semibold ">Dimensions</span>{" "}
                    <span>
                      {" "}
                      {product.dimensionWidth} × {product.dimensionHeight} ×{" "}
                      {product.dimensionLength} cm
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="p-3 sm:p-4">
                <h5 className="uppercase font-semibold mt-2 mb-4">
                  Customer reviews ({product.reviews.length})
                </h5>
                {product.reviews.length < 1 ? (
                  <h5 className="text-lg bg-red-50 py-4 px-8 rounded-lg w-fit text-red-500">
                    There is no review yet!
                  </h5>
                ) : (
                  <div className="space-y-4">
                    {product.reviews
                      .slice(0, isShowFull ? product.reviews.length : 4)
                      .map((review, id) => (
                        <div key={id}>
                          <div className="flex items-center gap-4 ">
                            <h5 className="font-semibold text-gray-600 capitalize">
                              {review.customer.firstName}{" "}
                              {review.customer.lastName}
                            </h5>
                            <span className="text-xs text-teal">
                              {GetTime(review.createdAt)}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center  mb-2">
                            <Rating
                              rating={review.rating || 0}
                              className="size-3.5 text-red-500"
                            />
                            <span>({review.rating})</span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {review.review}
                          </p>
                        </div>
                      ))}
                    <button
                      onClick={() => setIsShowFull((prev) => !prev)}
                      className="border-b mt-4 hover:text-teal"
                    >
                      {isShowFull ? "See Less Review" : "See All Review"}
                    </button>
                  </div>
                )}

                <div>
                  <div>
                    <h5 className="uppercase font-semibold mt-8">
                      Add a review
                    </h5>
                    <p className="text-sm text-gray-500 mt-1.5">
                      Your email address will not be published. Required fields
                      are marked
                    </p>
                  </div>
                  <form
                    action="#"
                    onSubmit={handleReview}
                    className="space-y-6 mt-8"
                  >
                    <TextBox
                      label="Your Review"
                      name="review"
                      value={reviewsDetail.review}
                      onChange={(e) =>
                        setReviewsDetail((prev) => ({
                          ...prev,
                          review: e.target.value,
                        }))
                      }
                    />
                    <RatingController
                      value={reviewsDetail.rating}
                      onChange={(rating) =>
                        setReviewsDetail((prev) => ({
                          ...prev,
                          rating: rating,
                        }))
                      }
                    />
                    <Button>{loading ? "SUBMITTING.." : "SUBMIT"}</Button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

import InputBox from "@/components/common/InputBox";
import Rating from "@/components/common/Rating";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/types/Product";
export default function MoreProductInfoSection({
  product,
}: {
  product: ProductType;
}) {
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
                    <span> 0.29375 lbs</span>
                  </li>
                  <li className="grid grid-cols-[112px_1fr] sm:grid-cols-[200px_1fr] items-center gap-4 border-x border-y p-2.5">
                    <span className="font-semibold ">Dimensions</span>{" "}
                    <span> 13.97 × 10.16 × 7.62 cm</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="p-3 sm:p-4">
                <h5 className="uppercase font-semibold mt-2 mb-4">
                  Customer reviews (10)
                </h5>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, id) => (
                    <div key={id}>
                      <div className="flex items-center gap-4 ">
                        <h5 className="font-semibold text-gray-600">
                          John due
                        </h5>
                        <span className="text-xs text-teal">(1 Jan 2026)</span>
                      </div>
                      <div className="flex gap-2 items-center  mb-2">
                        <Rating rating={5} className="size-3.5 text-red-500" />
                        <span>(5)</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Fashion has been creating well-designed collections
                        since 2010.
                      </p>
                    </div>
                  ))}
                  <button className="border-b mt-4 hover:text-teal">
                    See All Review
                  </button>
                </div>
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
                  <form action="" className="space-y-6 mt-8">
                    <TextBox label="Your Review" name="review" />
                    <div className="grid grid-cols-2 gap-6">
                      <InputBox label="name" name="name" />
                      <InputBox label="email" name="email" />
                    </div>
                    <Rating rating={5} />
                    <Button>SUBMIT</Button>
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

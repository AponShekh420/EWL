"use client";
import { DeleteModal } from "@/components/common/DeleteModal";
import Rating from "@/components/common/Rating";
import SearchBox from "@/components/common/SearchBox";
import SelectBox from "@/components/common/SelectBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductReviewType } from "@/types/Product";
import { getReviewsStatusColor } from "@/utils/getStatusColor";
import { GetTime } from "@/utils/getTime";
import { Icon } from "@iconify/react";
import Image from "next/image";
export default function ProductReviewsTable({
  reviews,
}: {
  reviews: ProductReviewType[];
}) {
  return (
    <div>
      <div className="my-5">
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-4 mt-5">
          <SearchBox placeholder="Search by product name..." />
          <div className="space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="hover:text-blue-400 hover:border-blue-500 capitalize text-gray-500"
            >
              <Icon icon="vaadin:list" width="32" height="32" />
            </Button>
          </div>
        </div>
      </div>
      <Table className=" !rounded-md border">
        <TableCaption>A list of product reviews list</TableCaption>
        <TableHeader className="bg-stone-100 ">
          <TableRow className="uppercase !h-13">
            <TableHead className="w-[170px] space-x-5 font-bold text-gray-500">
              <Checkbox className="checkbox-t" />
              <span>id</span>
            </TableHead>
            <TableHead className="font-bold text-gray-500 w-[400px] min-w-[350px] ">
              Customer review
            </TableHead>
            <TableHead className="font-bold text-gray-500">rating</TableHead>
            <TableHead className="font-bold text-gray-500">product</TableHead>
            <TableHead className="font-bold text-gray-500">created</TableHead>
            <TableHead className="font-bold text-gray-500">status</TableHead>
            <TableHead className="font-bold text-gray-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews?.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Checkbox className="checkbox-t" />
                  <span>RW-{review.id}</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-x-4 text-wrap">
                  <Image
                    src={review.customer.avatar}
                    alt=""
                    width={50}
                    height={50}
                    className="size-12 object-cover rounded-md"
                  />
                  <div className="font-lexend-deca">
                    <h5 className="font-medium">{review.customer.name}</h5>
                    <p className="text-gray-500  mt-0.5">{review.review}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 rounded-md border p-1 justify-center">
                  <Rating
                    rating={review.rating}
                    className="text-orange-400 size-3.5"
                  />
                  <span>{review.rating}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-x-4">
                  <Image
                    src={review.product.thumbnail}
                    alt=""
                    width={50}
                    height={50}
                    className="size-12 object-cover rounded-md"
                  />
                  <div className="font-lexend-deca">
                    <h5 className="font-medium">{review.product.name}</h5>
                    <p className="text-gray-500  mt-0.5">
                      {review.product.category}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{GetTime(review.createdAt)}</TableCell>
              <TableCell>
                <SelectBox
                  name="status"
                  label=""
                  value={review.status?.toLowerCase()}
                  className={`w-[150px] ${getReviewsStatusColor(
                    review.status as string
                  )}`}
                  placeholder="Change status"
                  onChange={(val) => console.log("Selected:", val)}
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Approved", value: "approved" },
                    { label: "Rejected", value: "rejected" },
                  ]}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <DeleteModal deleteAction={() => console.log(review.id)}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer hover:text-red-500 hover:border-red-500"
                    >
                      <Icon
                        icon="mingcute:delete-2-line"
                        width="32"
                        height="32"
                      />
                    </Button>
                  </DeleteModal>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-fit ml-auto">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

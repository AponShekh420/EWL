"use client";
import { DeleteModal } from "@/components/common/DeleteModal";
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
import { OrderType } from "@/types/Order";
import { PaginationType } from "@/types/Pagination";
import { debounce } from "@/utils/debounce";
import { GetTime } from "@/utils/getTime";
import { paginationCounter } from "@/utils/paginationCounter";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
export default function MyOrderTable({
  orders,
  pagination,
}: {
  orders: OrderType[];
  pagination: PaginationType;
}) {
  console.log("order", orders)
  const router = useRouter();
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        router.push(`/profile/my-orders?search=${value}`);
      }, 500),
    [router],
  );
  return (
    <div>
      <div className="my-4">
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-4 mt-5">
          <SearchBox
            placeholder="Search by customer name..."
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
      { (orders?.length == 0 || !orders) ? (<div className="min-h-52 flex items-center justify-center"><p className="text-xl font-semibold">No orders found</p></div>) : (
        <>
          <Table className=" !rounded-md border">
          <TableCaption>A list of order list</TableCaption>
          <TableHeader className="bg-stone-100 ">
            <TableRow className="uppercase !h-13">
              <TableHead className="font-bold text-gray-500">
                <Checkbox className="checkbox-t" />
                <span>Order</span>
              </TableHead>
              <TableHead className="font-bold text-gray-500">product</TableHead>
              <TableHead className="font-bold text-gray-500">Category</TableHead>
              <TableHead className="font-bold text-gray-500">Date</TableHead>
              <TableHead className="font-bold text-gray-500">Total</TableHead>

              <TableHead className="font-bold text-gray-500">Status</TableHead>
              <TableHead className="font-bold text-gray-500">action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    <Checkbox className="checkbox-t" />
                    <div className="flex items-center gap-x-4">
                      <div className="font-lexend-deca flex items-center gap-1">
                        <h5 className="font-medium">#{order.orderId}</h5>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-start flex-col text-wrap">
                    <span>{order?.products[0]?._id.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                    <span>{order.products[0]?._id?.category}</span>
                </TableCell>
                <TableCell>{GetTime(order.createdAt as string, true)}</TableCell>
                <TableCell className="font-medium">${(order.totalPrice).toFixed(2)}</TableCell>
                <TableCell>
                  {" "}
                  <div className="relative">
                    <span className="border-2 p-2 rounded-md">
                      {order.status?.toLowerCase()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-3">
                    <Link href={`/profile/my-orders/${order._id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer hover:text-blue-500 hover:border-blue-500"
                      >
                        <Icon icon="ph:eye-light" width="32" height="32" />
                      </Button>
                    </Link>
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
                  {pagination?.page > 1 ? (
                    <PaginationPrevious
                      href={`/profile/my-orders?page=${
                        pagination?.page - 1
                      }`}
                    />
                  ) : (
                    <button
                      disabled
                      className="disabled:text-gray-400 cursor-not-allowed"
                    >
                      {"< Previous"}
                    </button>
                  )}
                </PaginationItem>
                <PaginationItem>
                  {paginationCounter(pagination).map((page, index) => (
                    <PaginationLink
                      className={pagination?.page === page ? "bg-gray-100" : ""}
                      key={index}
                      href={`/profile/my-orders?page=${page}`}
                    >
                      {page}
                    </PaginationLink>
                  ))}
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  {pagination?.totalPages > pagination?.page ? (
                    <PaginationNext
                      href={`/profile/my-orders?page=${
                        pagination?.page + 1
                      }`}
                    />
                  ) : (
                    <button
                      disabled
                      className="disabled:text-gray-400 cursor-not-allowed"
                    >
                      {"Next >"}
                    </button>
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}

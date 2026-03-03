"use client";
import { DeleteModal } from "@/components/common/DeleteModal";
import SearchBox from "@/components/common/SearchBox";
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
import { PaginationType } from "@/types/Pagination";
import { ShippingType } from "@/types/Shipping";
import { debounce } from "@/utils/debounce";
import { BASE_URL } from "@/utils/envVariable";
import { paginationCounter } from "@/utils/paginationCounter";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export default function ShippingTable({
  shippings,
  pagination,
}: {
  shippings: ShippingType[];
  pagination: PaginationType;
}) {
  const router = useRouter();
  const deleteHandler = async (id: string) => {
    if (!id) return;

    try {
      const res = await fetch(BASE_URL + "/api/ecommerce/shipping/" + id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        router.refresh();
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        router.push(`/dashboard/ecommerce/shipping?search=${value}`);
      }, 500),
    [router],
  );
  return (
    <div>
      <div className="my-5">
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-4 mt-5">
          <SearchBox
            placeholder="Search by category name..."
            onChange={(e) => debouncedSearch(e.target.value)}
          />
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
        <TableCaption>A list of shipping list</TableCaption>
        <TableHeader className="bg-stone-100 ">
          <TableRow className="uppercase !h-13">
            <TableHead className="w-[200px] space-x-5 font-bold text-gray-500">
              <Checkbox className="checkbox-t" />
              <span>SL</span>
            </TableHead>
            <TableHead className="font-bold text-gray-500">zone Name</TableHead>
            <TableHead className="font-bold text-gray-500">region</TableHead>
            <TableHead className="font-bold text-gray-500">
              shipping methods
            </TableHead>

            <TableHead className="font-bold text-gray-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shippings?.map((shipping) => (
            <TableRow key={shipping._id}>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Checkbox className="checkbox-t" />
                  <div className="flex items-center gap-x-4">
                    {shipping._id
                      .slice(shipping._id.length - 4, shipping._id.length)
                      .toUpperCase()}
                  </div>
                </div>
              </TableCell>
              <TableCell>{shipping.zoneName}</TableCell>
              <TableCell>{shipping.region}</TableCell>

              <TableCell className="font-medium">
                <div className="flex gap-2">
                  {shipping.shippingMethods.map((method, sid) => (
                    <div
                      key={sid}
                      className="flex gap-2 bg-gray-200 px-2 py-1 rounded-md text-xs uppercase"
                    >
                      {method.methodName.replaceAll("-", " ")}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Link
                    href={`/dashboard/ecommerce/shipping/edit/${shipping._id}`}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer hover:text-blue-500 hover:border-blue-500"
                    >
                      <Icon
                        icon="fluent:edit-24-regular"
                        width="32"
                        height="32"
                      />
                    </Button>
                  </Link>
                  <DeleteModal deleteAction={() => deleteHandler(shipping._id)}>
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
              {pagination.page > 1 ? (
                <PaginationPrevious
                  href={`/dashboard/ecommerce/orders?page=${
                    pagination.page - 1
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
                  className={pagination.page === page ? "bg-gray-100" : ""}
                  key={index}
                  href={`/dashboard/ecommerce/orders?page=${page}`}
                >
                  {page}
                </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              {pagination.totalPages > pagination.page ? (
                <PaginationNext
                  href={`/dashboard/ecommerce/orders?page=${
                    pagination.page + 1
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
    </div>
  );
}

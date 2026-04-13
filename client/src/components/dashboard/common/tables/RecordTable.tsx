"use client";
import { DeleteModal } from "@/components/common/DeleteModal";
import PopupButton from "@/components/common/PopupButton";
import SearchBox from "@/components/common/SearchBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { IRecording } from "@/types/Recording";
import { debounce } from "@/utils/debounce";
import { BASE_URL } from "@/utils/envVariable";
import { paginationCounter } from "@/utils/paginationCounter";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
export default function RecordTable({
  records,
  pagination,
}: {
  records: IRecording[];
  pagination: PaginationType;
}) {
  const router = useRouter();
  const deleteHandler = async (id: string) => {
    if (!id) return;
    try {
      const res = await fetch(BASE_URL + "/api/e-learning/recording/" + id, {
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
        router.push(`/dashboard/ecommerce/orders?search=${value}`);
      }, 500),
    [router],
  );
  console.log(records);
  return (
    <div>
      <div className="my-4">
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-4 mt-5">
          <SearchBox
            placeholder="Search by customer name..."
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <div className="space-x-4">
            <Sheet>
              <SheetTrigger>
                <PopupButton className="hover:text-blue-400 hover:border-blue-500 capitalize ">
                  <Icon icon="majesticons:filter-line" width="20" height="20" />
                  <span>filters</span>
                </PopupButton>
                <span></span>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Product Filters</SheetTitle>
                  <hr className="mt-2" />
                  <SheetDescription>
                    <span className="mt-4 inline-block">
                      <label>Amount</label>
                      <span className="flex items-center gap-2 mt-2">
                        <Input placeholder="$ 0.00" />
                        <span className="font-bold text-gray-200">-</span>
                        <Input placeholder="$ 0.00" />
                      </span>
                    </span>
                    <span className="mt-4 block">
                      <label>Created Date</label>
                      <input
                        type="date"
                        className="border py-2 w-full px-4 rounded-md mt-2 "
                      />
                    </span>
                    <span className="mt-4 block">
                      <label>Modified Date</label>
                      <input
                        type="date"
                        className="border py-2 w-full px-4 rounded-md mt-2 "
                      />
                    </span>
                    <span className="mt-4 block">
                      <label>Status</label>
                      <select className="border py-2 w-full px-4 rounded-md mt-2 capitalize">
                        <option>Select Status</option>
                        <option value="paid">paid</option>
                        <option value="pending">pending</option>
                        <option value="overdue">overdue</option>
                        <option value="draft">draft</option>
                      </select>
                    </span>
                    <PopupButton className="w-[95%] bg-blue-500 text-white !py-2 mt-4 absolute bottom-10 left-1/2 -translate-1/2">
                      Show Results
                    </PopupButton>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

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
        <TableCaption>A list of record list</TableCaption>
        <TableHeader className="bg-stone-100 ">
          <TableRow className="uppercase !h-13">
            <TableHead className="w-[300px] space-x-5 font-bold text-gray-500">
              <Checkbox className="checkbox-t" />
              <span>Record Id</span>
            </TableHead>
            <TableHead className="font-bold text-gray-500">
              Category Id
            </TableHead>

            <TableHead className="font-bold text-gray-500">
              Recording For
            </TableHead>
            <TableHead className="font-bold text-gray-500">Heading</TableHead>
            <TableHead className="font-bold text-gray-500">gender</TableHead>
            <TableHead className="font-bold text-gray-500">
              Record List
            </TableHead>
            <TableHead className="font-bold text-gray-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records?.map((record) => (
            <TableRow key={record._id}>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Checkbox className="checkbox-t" />
                  <div className="flex items-center gap-x-4">
                    <div className="font-lexend-deca flex items-center gap-1">
                      <h5 className="font-medium">#{record._id}</h5>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {record.recordingCategory === "class"
                  ? record?.class
                  : record.recordingCategory === "course"
                    ? record?.course
                    : record?.speaker}
              </TableCell>
              <TableCell className="font-medium">
                {record.recordingCategory}
              </TableCell>
              <TableCell>{record?.heading}</TableCell>

              <TableCell className="font-medium">
                {record?.gender || "-"}
              </TableCell>
              <TableCell className="font-medium">
                {record.recordings.length}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Link
                    href={`/dashboard/e-learning/records/edit/${record._id}`}
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
                  <Link href={`/dashboard/e-learning/records/${record._id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer hover:text-blue-500 hover:border-blue-500"
                    >
                      <Icon icon="ph:eye-light" width="32" height="32" />
                    </Button>
                  </Link>
                  <DeleteModal deleteAction={() => deleteHandler(record._id)}>
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

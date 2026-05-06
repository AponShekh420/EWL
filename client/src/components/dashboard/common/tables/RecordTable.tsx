"use client";
import { DeleteModal } from "@/components/common/DeleteModal";
import PopupButton from "@/components/common/PopupButton";
import SearchBox from "@/components/common/SearchBox";
import { ShopPagination } from "@/components/shop/ShopPagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
import { IDisplayRecording } from "@/types/Recording";
import { debounce } from "@/utils/debounce";
import { BASE_URL } from "@/utils/envVariable";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
export default function RecordTable({
  records,
  pagination,
}: {
  records: IDisplayRecording[];
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
              <span>Heading</span>
            </TableHead>
            <TableHead className="font-bold text-gray-500">
              Ref Title
            </TableHead>

            <TableHead className="font-bold text-gray-500">
              Recording For
            </TableHead>
            <TableHead className="font-bold text-gray-500">Speaker</TableHead>
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
                  {record?.heading}
                </div>
              </TableCell>
              <TableCell>
                {record.recordingCategory === "class"
                  ? record?.class?.title
                  : (record.recordingCategory === "course" || record?.recordingCategory === "course-demo")
                    ? record?.course?.title
                    : <span className="text-red-500">No title for free recording</span>}
              </TableCell>
              <TableCell className="font-medium">
                {record.recordingCategory}
              </TableCell>
              <TableCell>{((record.recordingCategory === "course" || record.recordingCategory === "course-demo") ? (record?.course?.speaker?.firstName + " " + record?.course?.speaker?.lastName) : record.recordingCategory === "class" ? (record?.class?.speaker.firstName + " " + record?.class?.speaker.lastName) : (record?.speaker?.firstName + " " + record?.speaker?.lastName))}</TableCell>

              <TableCell className="font-medium">
                {((record.recordingCategory === "course" || record.recordingCategory === "course-demo") ? record?.course?.speaker.gender : record.recordingCategory === "class" ? record?.class?.speaker.gender : record?.gender)}
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
        <ShopPagination pagination={pagination}/>
      </div>
    </div>
  );
}

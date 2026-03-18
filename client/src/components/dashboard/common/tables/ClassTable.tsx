"use client";
import moment from "moment";
import { DeleteModal } from "@/components/common/DeleteModal";
import PopupButton from "@/components/common/PopupButton";
import ScrollArea from "@/components/common/ScrollArea";
import SearchBox from "@/components/common/SearchBox";
import SelectBox from "@/components/common/SelectBox";
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
import { CourseType } from "@/types/Course";
import { PaginationType } from "@/types/Pagination";
import { debounce } from "@/utils/debounce";
import { BASE_URL } from "@/utils/envVariable";
import { getImageUrl } from "@/utils/getImageUrl";
import { getProductStatusColor } from "@/utils/getStatusColor";
import { paginationCounter } from "@/utils/paginationCounter";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";


export default function ClassTable({
  courses,
  pagination,
}: {
  courses: CourseType[];
  pagination: PaginationType;
}) {
  const router = useRouter();
    const deleteHandler = async (id: string) => {
      if (!id) return;
      const res = await fetch(BASE_URL + "/api/e-learning/course/" + id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      }
    };
    const handleStatusChange = async (status: string, id: string) => {
      if (!id) return;
      const res = await fetch(BASE_URL + "/api/e-learning/course-status/" + id, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
      }
    };
  
    const debouncedSearch = useMemo(
      () =>
        debounce((value: string) => {
          router.push(`/dashboard/e-learning/courses?search=${value}`);
        }, 500),
      [router]
    );
  
  return (
    <div>
      <div className="my-5">
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-4 mt-5">
          <SearchBox
            placeholder="Search by course title..."
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
                  <SheetTitle>Course Filters</SheetTitle>
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
     <ScrollArea className="lg:w-[750px] xl:w-full overflow-x-scroll">
        <Table className=" !rounded-md border">
          <TableCaption>A list of course list</TableCaption>
          <TableHeader className="bg-stone-100 ">
            <TableRow className="uppercase !h-13">
              <TableHead className="w-[400px] space-x-5 font-bold text-gray-500">
                <Checkbox className="checkbox-t" />
                <span>Course</span>
              </TableHead>
              <TableHead className="font-bold text-gray-500">Price</TableHead>
              <TableHead className="font-bold text-gray-500">Students</TableHead>
              <TableHead className="font-bold text-gray-500">Speaker</TableHead>
              <TableHead className="font-bold text-gray-500">Date</TableHead>
              <TableHead className="font-bold text-gray-500">Status</TableHead>
              <TableHead className="font-bold text-gray-500">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map((course) => (
              <TableRow key={course?._id}>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    <Checkbox className="checkbox-t" />
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={getImageUrl(course.thumbnail, "courses")}
                        alt={course.title}
                        width={50}
                        height={50}
                        className="size-12 object-cover rounded-md"
                      />
                      <div className="font-lexend-deca">
                        <h5 className="font-medium">{course.title}</h5>
                        <p className="text-gray-500  mt-0.5">
                          {course.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{course?.price}</TableCell>
                <TableCell>{course?.students}</TableCell>
                <TableCell>{course?.speaker?.firstName} {course?.speaker?.lastName}</TableCell>
                
                <TableCell className="font-medium">{moment(course?.updatedAt).format("lll")}</TableCell>
                <TableCell>
                  <SelectBox
                    name="status"
                    label=""
                    value={course?.status?.toLowerCase()}
                    className={`w-[150px] ${getProductStatusColor(
                      course?.status as string
                    )}`}
                    placeholder="Change status"
                    onChange={(val) => handleStatusChange(val, course?._id || "")}
                    options={[
                      { label: "Pending", value: "pending" },
                      { label: "Publish", value: "publish" },
                      { label: "Draft", value: "draft" },
                    ]}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-3">
                    <Link
                      href={`/dashboard/e-learning/courses/edit/${course?.slug}`}
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
                    <Link
                      href={`/dashboard/e-learning/courses/${course?.slug}`}
                    >
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer hover:text-blue-500 hover:border-blue-500"
                      >
                        <Icon icon="ph:eye-light" width="32" height="32" />
                      </Button>
                    </Link>
                    <DeleteModal
                      deleteAction={() => course?._id && deleteHandler(course._id)}
                    >
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
     </ScrollArea>
      <div className="w-fit ml-auto">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {pagination.page > 1 ? (
                <PaginationPrevious
                  href={`/dashboard/e-learning/courses?page=${
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
                  href={`/dashboard/e-learning/courses?page=${page}`}
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
                  href={`/dashboard/e-learning/courses?page=${
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

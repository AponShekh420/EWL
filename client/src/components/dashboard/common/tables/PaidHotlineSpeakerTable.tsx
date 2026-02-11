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
import { PaidHotlineSpeakerType } from "@/types/PaidHotlineSpeaker";
import { debounce } from "@/utils/debounce";
import { BASE_URL } from "@/utils/envVariable";
import { getImageUrl } from "@/utils/getImageUrl";
import { paginationCounter } from "@/utils/paginationCounter";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export default function PaidHotlineSpeakerTable({
  speakers,
  pagination,
}: {
  speakers: PaidHotlineSpeakerType[];
  pagination: PaginationType;
}) {
  const router = useRouter();
  const deleteHandler = async (id: string) => {
    if (!id) return;
    const res = await fetch(BASE_URL + "/api/paid-hotline/speaker/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      toast.success(data.message);
    }
  };
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        router.push(`/dashboard/paid-hotline-speaker?search=${value}`);
      }, 500),
    [router],
  );
  return (
    <div>
      <div className="my-5">
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-4 mt-5">
          <SearchBox
            placeholder="Search by speaker name..."
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
        <TableCaption>A list of speaker list</TableCaption>
        <TableHeader className="bg-stone-100 ">
          <TableRow className="uppercase !h-13">
            <TableHead className="w-[200px] space-x-5 font-bold text-gray-500">
              <Checkbox className="checkbox-t" />
              <span>Avatar</span>
            </TableHead>
            <TableHead className="font-bold text-gray-500">
              Speaker name
            </TableHead>
            <TableHead className="font-bold text-gray-500">Gender</TableHead>
            <TableHead className="font-bold text-gray-500">
              Speciality
            </TableHead>

            <TableHead className="font-bold text-gray-500">
              Description
            </TableHead>

            <TableHead className="font-bold text-gray-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {speakers?.map((speaker) => (
            <TableRow key={speaker._id}>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Checkbox className="checkbox-t" />
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={getImageUrl(speaker.avatar, "profile")}
                      alt={speaker.fullname}
                      width={50}
                      height={50}
                      className="size-12 object-cover rounded-md"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>{speaker.fullname}</TableCell>
              <TableCell>{speaker.gender}</TableCell>
              <TableCell>{speaker.speciality}</TableCell>
              <TableCell className="max-w-[200px]">
                <div
                  className="text-wrap "
                  dangerouslySetInnerHTML={{ __html: speaker.description }}
                />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Link
                    href={`/dashboard/paid-hotline-speaker/edit/${speaker._id}`}
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
                  <DeleteModal deleteAction={() => deleteHandler(speaker._id)}>
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
                  href={`/dashboard/ecommerce/categories?page=${
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
                  href={`/dashboard/ecommerce/categories?page=${page}`}
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
                  href={`/dashboard/ecommerce/categories?page=${
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

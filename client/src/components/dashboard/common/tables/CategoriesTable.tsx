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
import { CategoryType } from "@/types/Category";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesTable({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div>
      <div className="my-5">
        <div className="flex justify-between flex-col-reverse sm:flex-row gap-4 mt-5">
          <SearchBox placeholder="Search by category name..." />
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
        <TableCaption>A list of category list</TableCaption>
        <TableHeader className="bg-stone-100 ">
          <TableRow className="uppercase !h-13">
            <TableHead className="w-[200px] space-x-5 font-bold text-gray-500">
              <Checkbox className="checkbox-t" />
              <span>Image</span>
            </TableHead>
            <TableHead className="font-bold text-gray-500">
              Category Name
            </TableHead>
            <TableHead className="font-bold text-gray-500">
              Description
            </TableHead>
            <TableHead className="font-bold text-gray-500">Slug</TableHead>
            <TableHead className="font-bold text-gray-500">Product</TableHead>
            <TableHead className="font-bold text-gray-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Checkbox className="checkbox-t" />
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={50}
                      height={50}
                      className="size-12 object-cover rounded-md"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="font-medium">
                ${category.products}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Link
                    href={`/dashboard/ecommerce/categories/edit/${category.slug}`}
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
                  <DeleteModal deleteAction={() => console.log(category.id)}>
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

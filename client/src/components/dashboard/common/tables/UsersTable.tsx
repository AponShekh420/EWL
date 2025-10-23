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
import { UserType } from "@/types/User";
import { getUserRoleColor } from "@/utils/getStatusColor";
import { GetTime } from "@/utils/getTime";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
export default function UsersTable({ users }: { users: UserType[] }) {
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
        <TableCaption>A list of product user list</TableCaption>
        <TableHeader className="bg-stone-100 ">
          <TableRow className="uppercase !h-13">
            <TableHead className="w-[170px] space-x-5 font-bold text-gray-500">
              <Checkbox className="checkbox-t" />
              <span>id</span>
            </TableHead>
            <TableHead className="font-bold text-gray-500 w-[200px]">
              Avatar
            </TableHead>
            <TableHead className="font-bold text-gray-500">name</TableHead>
            <TableHead className="font-bold text-gray-500">email</TableHead>
            <TableHead className="font-bold text-gray-500">created</TableHead>
            <TableHead className="font-bold text-gray-500">Role</TableHead>
            <TableHead className="font-bold text-gray-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Checkbox className="checkbox-t" />
                  <span>RW-{user.id}</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-x-4 text-wrap">
                  <Image
                    src={user.avatar}
                    alt=""
                    width={50}
                    height={50}
                    className="size-12 object-cover rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{GetTime(user.createdAt)}</TableCell>
              <TableCell>
                <SelectBox
                  name="status"
                  label=""
                  value={user.role?.toLowerCase()}
                  className={`w-[150px] ${getUserRoleColor(
                    user.role as string
                  )}`}
                  placeholder="Change status"
                  onChange={(val) => console.log("Selected:", val)}
                  options={[
                    { label: "User", value: "user" },
                    { label: "Admin", value: "admin" },
                    { label: "Customer", value: "customer" },
                    { label: "Speaker", value: "speaker" },
                  ]}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Link href={`/dashboard/users/edit/${user.id}`}>
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
                  <Link href={`/dashboard/users/${user.id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer hover:text-blue-500 hover:border-blue-500"
                    >
                      <Icon icon="ph:eye-light" width="32" height="32" />
                    </Button>
                  </Link>
                  <DeleteModal deleteAction={() => console.log(user.id)}>
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

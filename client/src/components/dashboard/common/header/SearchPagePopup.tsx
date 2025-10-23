import ScrollArea from "@/components/common/ScrollArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { search_page__links } from "@/constants/search_page_links";

import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

export default function SearchPagePopup({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pageLinks, setPageLinks] = useState(search_page__links);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filterPage = search_page__links.filter((pageLink) =>
      pageLink.name.toLowerCase().startsWith(value)
    );
    setPageLinks(filterPage);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <span className="mt-2 block min-h-[500px]">
              <span className="flex items-center  border rounded-md px-2">
                <Icon
                  icon="iconamoon:search-light"
                  className="size-5"
                  width="18"
                  height="18"
                />

                <Input
                  className={`!py-2.5 h-full w-full block border-none focus-visible:ring-0 text-sm placeholder:font-medium placeholder:text-gray-400`}
                  placeholder="Search Pages Here"
                  onChange={handleSearch}
                />
              </span>
              <span className="mt-4 mb-2 ml-3 block">Home</span>
              <ScrollArea
                className="block max-h-[400px] overflow-y-auto"
                element="span"
              >
                {pageLinks.map((pageLink) => (
                  <Link
                    key={pageLink.id}
                    className="flex gap-5 items-center py-2 px-2 hover:bg-gray-100 rounded-lg"
                    href={pageLink.url}
                    onClick={() => setOpen(false)}
                  >
                    <Icon icon="iconoir:page-star" width="32" height="32" />
                    <span className="flex flex-col">
                      <span className="capitalize text-gray-800">
                        {pageLink.name}
                      </span>
                      <span>{pageLink.url}</span>
                    </span>
                  </Link>
                ))}
              </ScrollArea>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

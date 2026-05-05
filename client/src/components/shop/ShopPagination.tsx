"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationCounter } from "@/utils/paginationCounter";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useQueryPush } from "@/app/hook/useQueryPush";
import { Icon } from "@iconify/react";
export const ShopPagination = ({pagination}: {pagination: any}) => {
    const pushQuery = useQueryPush();
    return (
        <>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {pagination.page > 1 ? (
                <p
                  className={`py-1 px-3 rounded-md cursor-pointer flex gap-2 hover:bg-gray-100`}
                  onClick={()=> pushQuery("page", String(pagination.page - 1))}
                ><Icon icon="weui:arrow-outlined" width="12" height="24" rotate={2} /> Previous</p>
              ) : (
                <button
                  disabled
                  className="disabled:text-gray-400 cursor-not-allowed"
                >
                  {"< Previous"}
                </button>
              )}
            </PaginationItem>
            <PaginationItem className="flex">
              {paginationCounter(pagination).map((page, index) => (
                <p
                  className={`${pagination.page === page ? "bg-gray-100" : ""} py-1 px-3 rounded-md cursor-pointer`}
                  key={index}
                  onClick={()=> pushQuery("page", String(page))}
                  // href={`#`}
                >
                  {page}
                </p>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem >
              {pagination.totalPages > pagination.page ? (
                <p
                  className={`py-1 px-3 rounded-md cursor-pointer flex gap-2 hover:bg-gray-100`}
                  onClick={()=> pushQuery("page", String(pagination.page + 1))}
                >Next <Icon icon="weui:arrow-outlined" width="12" height="24" /></p>
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
        </>
    );
}

export default Pagination;
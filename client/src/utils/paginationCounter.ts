import { PaginationType } from "@/types/Pagination";

export const paginationCounter = (pagination: PaginationType) => {
  const startPage = Math.max(pagination.totalPages - 9, 1);
  const endPage = pagination.totalPages;
  const latestPages = [];
  for (let i = startPage; i <= endPage; i++) {
    latestPages.push(i);
  }
  return latestPages;
};

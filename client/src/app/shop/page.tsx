import { getCategories } from "@/actions/category";
import { getProductByQuery } from "@/actions/product";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import ShopSection from "@/components/shop/ShopSection";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paginationCounter } from "@/utils/paginationCounter";
import { queryFormatter } from "@/utils/queryFormatter";

export default async function Shop({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const {
    data: productsData,
    price,
    pagination,
  } = await getProductByQuery(query);
  const { data: categories } = await getCategories();

  return (
    <main className="container min-h-screen">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center py-8 sm:py-10  md:py-14 uppercase">
          Shop All Products
        </h1>
        <BreadcrumbPath
          breadcrumbList={[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
          ]}
        />
      </div>
      <ShopSection
        products={productsData}
        categories={categories}
        pagination={pagination}
        price={price}
      />
      <div className="w-fit ml-auto py-8">
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
    </main>
  );
}

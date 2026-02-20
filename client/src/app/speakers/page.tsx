// import { getCategories } from "@/actions/category";
import { getProductByQuery } from "@/actions/product";
import FadeInSection from "@/components/common/FadeInSection";
import SpeakerGrid from "@/components/speakers/SpeakerGrid";
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

export default async function Speakers({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const {
    // data: productsData,
    // price,
    pagination,
  } = await getProductByQuery(query);
  // const { data: categories } = await getCategories();

  return (
    <main>
      <section className="hero-banner grid place-items-center">
        <FadeInSection
          initial={{ opacity: 0, y: -50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -50 }}
          margin="40px 0px -40px 0px"
        >
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center">
            All Speakers
          </h1>
        </FadeInSection>
      </section>
      <section className="container min-h-screen">
        <SpeakerGrid />
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
      </section>
    </main>
  );
}

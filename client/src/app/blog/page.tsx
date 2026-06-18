import { getBlogByQueryWithVisible } from "@/actions/blog";
import { getBlogCategories } from "@/actions/blogCategory";
import { getProductByQueryWithVisible } from "@/actions/product";
import BlogSection from "@/components/blog/BlogSection";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import { ShopPagination } from "@/components/shop/ShopPagination";
import ShopSection from "@/components/shop/ShopSection";
// import { getSession } from "@/lib/authLib";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react"


export default async function Shop({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const user = await getSession();
  // if(!user) {
  //   return redirect("/login")
  // }
  const query = await queryFormatter(searchParams);
  const {
    data: blogsData,
    pagination,
  } = await getBlogByQueryWithVisible(query);
  const { data: categories } = await getBlogCategories();

  return (
    <main className="container min-h-screen">
      <div className="w-full max-w-142 mx-auto mb-15">
        <h1 className="uppercase text-3xl md:text-4xl lg:text-5xl font-semibold text-center py-6 sm:py-7  md:py-10">
          Blog
        </h1>
        <div className="border-b-2 border-violet-cs my-0 relative w-full max-w-142">
          <span className="text-4xl text-violet-cs absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-light rounded-full px-1 py-0.5 inline-block w-fit h-fit">
            <Icon icon="mdi:heart" className="size-7 " />
          </span>
        </div>
        <p className="text-center text-violet-cs text-lg mt-5 font-semibold">
          Insights, Guidance & Torah Perspectives
        </p>
        <p className="text-center text-base mt-2">
          Practical advice, real stories, and Torah wisdom on marriage, family, personal growth and women&apos;s health.
        </p>
      </div>
      <BlogSection
        blogs={blogsData}
        categories={categories}
        pagination={pagination}
      />
      <div className="w-fit ml-auto py-8">
        <ShopPagination pagination={pagination}/>
      </div>
    </main>
  );
}

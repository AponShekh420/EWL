import { getBlogByQueryWithVisible } from "@/actions/blog";
import { getBlogCategories } from "@/actions/blogCategory";
import { getProductByQueryWithVisible } from "@/actions/product";
import BlogSection from "@/components/blog/BlogSection";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import { ShopPagination } from "@/components/shop/ShopPagination";
import ShopSection from "@/components/shop/ShopSection";
// import { getSession } from "@/lib/authLib";
import { queryFormatter } from "@/utils/queryFormatter";

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
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center py-8 sm:py-10  md:py-14 uppercase">
          Blog
        </h1>
        <BreadcrumbPath
          breadcrumbList={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
          ]}
        />
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

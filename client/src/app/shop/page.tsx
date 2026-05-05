import { getCategories } from "@/actions/category";
import { getProductByQueryWithVisible } from "@/actions/product";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import { ShopPagination } from "@/components/shop/ShopPagination";
import ShopSection from "@/components/shop/ShopSection";
import { getSession } from "@/lib/authLib";
import { queryFormatter } from "@/utils/queryFormatter";
import { redirect } from "next/navigation";

export default async function Shop({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }
  const query = await queryFormatter(searchParams);
  const {
    data: productsData,
    price,
    pagination,
  } = await getProductByQueryWithVisible(query);
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
        <ShopPagination pagination={pagination}/>
      </div>
    </main>
  );
}

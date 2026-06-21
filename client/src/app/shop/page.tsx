import { getCategories } from "@/actions/category";
import { getProductByQueryWithVisible } from "@/actions/product";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import FadeInSection from "@/components/common/FadeInSection";
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
    <main >
      <section className="bg-[linear-gradient(rgba(0,120,200,0.4),rgba(0,120,200,0.4)),url('/images/volunteer/backlit-bird-clouds-755385.png')] bg-cover bg-center h-[200px] w-full grid place-items-center">
        <FadeInSection
          initial={{ opacity: 0, y: -50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -50 }}
          margin="40px 0px -40px 0px"
        >
          <h1 className="text-white font-extrabold text-3xl lg:text-4xl text-center">
            Shop
          </h1>
        </FadeInSection>
      </section>
      <section className="container min-h-screen">
        <ShopSection
          products={productsData}
          categories={categories}
          pagination={pagination}
          price={price}
        />
        <div className="w-fit ml-auto py-8">
          <ShopPagination pagination={pagination}/>
        </div>
      </section>
    </main>
  );
}

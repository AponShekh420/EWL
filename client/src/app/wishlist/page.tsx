import { getWishList } from "@/actions/wishlist";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import WishlistTable from "@/components/wishlist/WishlistTable";
import { Icon } from "@iconify/react";

export default async function Wishlist() {
  const { data: wishlist } = await getWishList();

  return (
    <main className="min-h-screen">
      <section className="container">
        <div className="mt-8 md:mt-12 lg:mt-16">
          <BreadcrumbPath
            breadcrumbList={[
              { name: "Home", href: "/" },
              { name: "Wishlist", href: "/wishlist" },
            ]}
          />
        </div>
        <div className="max-w-[900px] mx-auto">
          <div
            className="flex flex-row-reverse
           md:flex-col justify-end md:justify-center items-center gap-4 pt-5"
          >
            <Icon
              icon="qlementine-icons:heart-16"
              width="70"
              height="70"
              className="size-7 sm:size-8 md:size-18"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              My Wishlist
            </h2>
          </div>

          <WishlistTable products={wishlist.items} />
        </div>
      </section>
    </main>
  );
}

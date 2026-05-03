import { getWishList } from "@/actions/wishlist";
import WishlistTable from "@/components/wishlist/WishlistTable";

export default async function Wishlist() {
  const { data: wishlist } = await getWishList();
  return (
    <div>
      <div className="max-w-[900px] mx-auto pb-4">
        <div className="pt-5">
          <h2 className="text-2xl font-bold text-slate-800 underline underline-offset-8">
            My Wishlist
          </h2>
        </div>
        <WishlistTable products={wishlist.items} />
      </div>
    </div>
  );
}

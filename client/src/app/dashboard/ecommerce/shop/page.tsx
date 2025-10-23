import PopupButton from "@/components/common/PopupButton";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ProductCard from "@/components/dashboard/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { productsData } from "@/constants/products";
import { Icon } from "@iconify/react";
export default function Shop() {
  return (
    <div>
      <PageHeading
        pageTitle="Shop"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Shop", href: "/ecommerce/shop" },
        ]}
      >
        <Sheet>
          <SheetTrigger>
            <PopupButton className="hover:text-blue-400 hover:border-blue-500 capitalize bg-blue-500 text-white ">
              <Icon icon="majesticons:filter-line" width="20" height="20" />
              <span>filters</span>
            </PopupButton>
            <span></span>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Product Filters</SheetTitle>
              <hr className="mt-2" />
              <SheetDescription>
                <span className="mt-4 inline-block">
                  <label>Amount</label>
                  <span className="flex items-center gap-2 mt-2">
                    <Input placeholder="$ 0.00" />
                    <span className="font-bold text-gray-200">-</span>
                    <Input placeholder="$ 0.00" />
                  </span>
                </span>
                <span className="mt-4 block">
                  <label>Created Date</label>
                  <input
                    type="date"
                    className="border py-2 w-full px-4 rounded-md mt-2 "
                  />
                </span>
                <span className="mt-4 block">
                  <label>Status</label>
                  <select className="border py-2 w-full px-4 rounded-md mt-2 capitalize">
                    <option>Select Status</option>
                    <option value="paid">paid</option>
                    <option value="pending">pending</option>
                    <option value="overdue">overdue</option>
                    <option value="draft">draft</option>
                  </select>
                </span>
                <PopupButton className="w-[95%] bg-blue-500 text-white !py-2 mt-4 absolute bottom-10 left-1/2 -translate-1/2">
                  Show Results
                </PopupButton>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </PageHeading>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button variant="blue" className="mx-auto w-fit block my-8">
        Load more...
      </Button>
    </div>
  );
}

import { getCartList } from "@/actions/cart";
import CartDetails from "@/components/cart/CartDetails";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default async function Cart() {
  const { data: cart } = await getCartList();

  return (
    <main>
      <section className="container min-h-[60vh]">
        <div className="mt-8 md:mt-12 lg:mt-16">
          <BreadcrumbPath
            breadcrumbList={[
              { name: "Home", href: "/" },
              { name: "Cart", href: "/cart" },
            ]}
          />
        </div>
        <h2 className="text-4xl font-semibold mt-5 ">Your Shopping Cart</h2>
        <CartDetails cart={cart} />
      </section>
      <section className="container pt-32 pb-20">
        <div className="flex items-center justify-between  rounded-lg px-4 sm:px-14 py-18 lg:py-8  gap-12 lg:gap-10 flex-col lg:flex-row min-h-90 sm:min-h-80 bg-[linear-gradient(135deg,rgba(50,151,168,0.6),rgba(50,151,168,0.6)),url('/images/cart/laptop-bg.webp')] bg-no-repeat bg-bottom bg-cover">
          <h1 className="text-3xl sm:text-4xl  md:text-5xl uppercase max-w-[800px] md:leading-[60px] font-semibold text-center lg:text-left text-white">
            Stay connect about our latest offer
          </h1>
          <form action="">
            <div className="text-white w-[300px] md:w-[400px] lg:w-[400px] flex items-center border  gap-1 rounded-full  pl-10 bg-white/20 text-sm">
              <Icon
                icon="mdi:email-outline"
                width="22"
                height="22"
                className="text-gray-300"
              />
              <input
                className="bg-transparent py-3 sm:py-3.5 w-full h-full  focus:outline-none"
                placeholder="Enter your email address"
              />
            </div>

            <Button className="rounded-full w-full mt-4 h-11.5 sm:h-12">
              Subscribe to Newsletter
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

import { getCartList } from "@/actions/cart";
import CheckoutDetails from "@/components/checkout/CheckoutDetails";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import BreadcrumbPath from "@/components/common/BreadcrumbPath";

export default async function Checkout() {
  const { data: cart } = await getCartList();
  console.log(cart);
  return (
    <main className="min-h-screen">
      <section className="container">
        <div>
          <div className="grid lg:grid-cols-2">
            <div className="pr-8 lg:border-r">
              <div className="mt-8 md:mt-12 lg:mt-16">
                <BreadcrumbPath
                  breadcrumbList={[
                    { name: "Home", href: "/" },
                    { name: "Cart", href: "/cart" },
                    { name: "Checkout", href: "/checkout" },
                  ]}
                />
              </div>
              <h2 className="text-4xl font-semibold mt-10 ">Checkout</h2>
              <h5 className="text-xl font-semibold mt-5">Billing Details.</h5>
              <CheckoutForm />
            </div>

            <CheckoutDetails cart={cart} />
          </div>
        </div>
      </section>
    </main>
  );
}

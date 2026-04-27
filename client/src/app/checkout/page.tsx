import { getCartList } from "@/actions/cart";

import CheckoutContent from "@/components/checkout/CheckoutContent";

export default async function Checkout() {
  const { data: cart } = await getCartList();
  console.log(cart);
  return (
    <main className="min-h-screen">
      <section className="container">
        <div>
          <CheckoutContent cart={cart}/>
        </div>
      </section>
    </main>
  );
}

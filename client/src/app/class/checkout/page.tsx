import { getCartList } from "@/actions/cart";

import CheckoutContent from "@/components/checkout/CheckoutContent";
import { redirect } from "next/navigation";

export default async function Checkout() {
  let cart;
  
  try {
    const { data } = await getCartList();
    if(data.items.length == 0) {
      return redirect("/classes")
    }
    cart = data;
  } catch(err) {
    return redirect("/classes")
  }
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

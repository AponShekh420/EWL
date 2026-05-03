import { getCartList } from "@/actions/cart";

import CheckoutContent from "@/components/checkout/CheckoutContent";
import { getSession } from "@/lib/authLib";
import { redirect } from "next/navigation";

export default async function Checkout() {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }
  let cart;
  
  try {
    const { data } = await getCartList();
    if(data.items.length == 0) {
      return redirect("/shop")
    }
    cart = data;
  } catch(err) {
    return redirect("/shop")
  }

  console.log("cart", cart)
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

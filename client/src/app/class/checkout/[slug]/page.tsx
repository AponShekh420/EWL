import { getClassCartList } from "@/actions/classCart";
import CheckoutContent from "@/components/class-checkout/CheckoutContent";
import { getSession } from "@/lib/authLib";

import { redirect } from "next/navigation";

export default async function Checkout({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }
  const {slug} = await params;

  let cart;
  
  try {
    const { data } = await getClassCartList(slug);

    if(!data) {
      return redirect("/classes")
    }
    cart = {
      _id: 'temp-id', // Temporary ID, replace with actual if available
      createdAt: new Date(),
      totalPrice: data.price,
      totalClass: 1,
      items: [
        {
          price: data.price,
          class: data,
          quantity: 1
        }
      ]
    };
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

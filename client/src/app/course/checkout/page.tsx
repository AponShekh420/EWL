import CheckoutContent from "@/components/course-checkout/CheckoutContent";
import { getSession } from "@/lib/authLib";

import { redirect } from "next/navigation";

export default async function Checkout() {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }

  return (
    <main className="min-h-screen">
      <section className="container">
        <div>
          <CheckoutContent/>
        </div>
      </section>
    </main>
  );
}

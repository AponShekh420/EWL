import { getCourseCartList } from "@/actions/courseCart";
import CheckoutContent from "@/components/course-checkout/CheckoutContent";

import { redirect } from "next/navigation";

export default async function Checkout({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {slug} = await params;

  let cart;
  
  try {
    const { data } = await getCourseCartList(slug);

    if(!data) {
      return redirect("/courses")
    }
    cart = {
      _id: 'temp-id', // Temporary ID, replace with actual if available
      createdAt: new Date(),
      totalPrice: data.price,
      totalCourse: 1,
      items: [
        {
          price: data.price,
          course: data,
          quantity: 1
        }
      ]
    };
  } catch(err) {
    return redirect("/courses")
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

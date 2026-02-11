import { getCartList } from "@/actions/cart";
import Nav from "./Nav";

export default async function Header() {
  const { data: cart } = await getCartList();

  return (
    <>
      <Nav cart={cart} />
    </>
  );
}

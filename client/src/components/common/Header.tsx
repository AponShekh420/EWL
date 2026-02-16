import { getCartListForHeader } from "@/actions/cart";
import Nav from "./Nav";

export default async function Header() {
  const cart = await getCartListForHeader();
  return (
    <>
      <Nav cart={cart} />
    </>
  );
}

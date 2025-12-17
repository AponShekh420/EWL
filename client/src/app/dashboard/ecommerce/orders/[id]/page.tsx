import PageHeading from "@/components/dashboard/common/PageHeading";
import { EmptyItemIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  orderStatus,
  shippingCharge,
  transactionsList,
} from "@/constants/order-data";
import { OrderType } from "@/types/Order";
import { BASE_URL } from "@/utils/envVariable";
import { GetTime } from "@/utils/getTime";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await fetch(BASE_URL + "/api/ecommerce/orders/" + id);
  const { data: order }: { data: OrderType } = await res.json();

  return (
    <div>
      <PageHeading
        pageTitle={`Order #${order.orderId}`}
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Orders", href: "/ecommerce/orders" },
          {
            name: `#${id}`,
            href: `/ecommerce/orders/${id}`,
          },
        ]}
      >
        <Link href={`/dashboard/ecommerce/orders/edit/${id}`}>
          <Button variant="blue">
            <span>Edit Orders</span>
          </Button>
        </Link>
      </PageHeading>

      <div className="hidden sm:flex gap-4 flex-col sm:flex-row items-start sm:items-center text-sm font-lexend-deca text-gray-600 border-y py-4 my-5 ">
        <p className="sm:border-r w-fit pr-4">
          {GetTime(new Date(order.createdAt), true)}
        </p>
        <p className="sm:border-r w-fit sm:px-4">{order.totalProduct} Items</p>
        <p className="sm:border-r w-fit sm:px-4">Total ${order.totalPrice}</p>
        <button className="bg-green-300 text-green-800 px-3 py-1 text-sm rounded-2xl sm:ml-4">
          Paid
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 lg:gap-4 xl:gap-8 2xl:gap-16">
        <div className=" mt-6 sm:mt-0">
          <Table className=" !rounded-md overflow-hidden">
            <TableCaption></TableCaption>
            <TableHeader className="bg-stone-100 ">
              <TableRow className="uppercase !h-11">
                <TableHead className="w-[400px] space-x-5 font-bold text-gray-500">
                  Product
                </TableHead>

                <TableHead className="font-bold text-gray-500">
                  Product Price
                </TableHead>

                <TableHead className="font-bold text-gray-500">
                  Quantity
                </TableHead>

                <TableHead className="font-bold text-gray-500">
                  Total Price
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.products.map((product, index) => (
                <TableRow key={product._id + index}>
                  <TableCell>
                    <div>
                      <Image
                        src={product.thumbnail}
                        width={100}
                        height={100}
                        alt={product.title}
                        className="w-25 h-25 object-cover rounded-lg"
                      />
                      <h5 className="font-semibold mt-2">{product.title}</h5>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>${product.salePrice}</TableCell>
                  <TableCell>{1}</TableCell>
                  <TableCell className="font-medium">
                    ${Number(product.salePrice) * Number(1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {order.products.length < 1 && (
            <div className="w-fit mx-auto">
              <EmptyItemIcon />
              <p className="text-gray-500 text-center">No Data</p>
            </div>
          )}

          <hr className="mt-10 mb-8" />
          <div className="max-w-[400px] ml-auto space-y-4">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>${order.totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Store Credit</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span>${shippingCharge}.00</span>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span>${order.totalPrice + shippingCharge}</span>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-bold mt-10">Transactions</h5>
            <div>
              {transactionsList.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-5 shadow border rounded-lg mt-8"
                >
                  <div className="flex items-center gap-8">
                    <Icon icon={transaction.method} width="41.17" height="32" />
                    <div>
                      <h5>Payment</h5>
                      <p className="text-sm mt-0.5 text-gray-500">
                        Via {transaction.name}
                      </p>
                    </div>
                  </div>
                  <h2 className="font-bold text-gray-500">
                    ${transaction.amount}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:px-5 py-5 lg:px-8 lg:py-8  mt-8 lg:mt-0">
          <h5 className="font-bold text-lg font-lexend-deca">Order Status</h5>
          <div className="mt-5 shadow border rounded-md p-8">
            <ul className="border-l-2 space-y-5">
              {orderStatus.map((step, index) => (
                <li className="pl-5 relative" key={index}>
                  {step.status}
                  <span className="size-5 bg-gray-200 rounded-full inline-block absolute -left-2.5 top-1/2 -translate-y-1/2 z-[1]"></span>
                  {step.isStep && (
                    <span className="size-5 bg-blue-500 rounded-full inline-flex justify-center text-white items-center absolute -left-2.5 top-1/2 -translate-y-1/2 z-[2] ">
                      ✓
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <h5 className="font-bold text-lg font-lexend-deca mt-8">
            Customer Details
          </h5>
          <div className="flex flex-col lg:flex-row gap-4 mt-5 shadow border rounded-md p-6">
            <Image
              src={order?.customer?.avatar || "/images/user.png"}
              width={80}
              height={80}
              alt="customer"
              className="rounded-xl"
            />
            <div className="space-y-2">
              <h5 className="font-lexend-deca font-medium">
                {order?.customer?.firstName + " " + order?.customer?.lastName}
              </h5>
              <p className="text-sm text-gray-500">{order.customer?.email}</p>
              <p className="text-gray-500 text-sm">(316) 555-0116</p>
            </div>
          </div>
          <h5 className="font-bold text-lg font-lexend-deca mt-8">
            Shipping Address
          </h5>
          <div className=" mt-5 shadow border rounded-md p-6">
            <div className="space-y-2">
              <div className="font-lexend-deca capitalize">
                <span className="font-medium">Address: </span>{" "}
                <span className="text-gray-500">
                  {order.shippingInfo.streetAddress +
                    ", " +
                    order.shippingInfo.city}
                </span>
              </div>
              <div className="font-lexend-deca capitalize">
                <span className="font-medium">state: </span>{" "}
                <span className="text-gray-500">
                  {order.shippingInfo.state}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">country: </span>{" "}
                <span className="text-gray-500">
                  {order.shippingInfo.country}
                </span>
              </div>
            </div>
          </div>
          <h5 className="font-bold text-lg font-lexend-deca mt-8">
            Billing Information
          </h5>
          <div className=" mt-5 shadow border rounded-md p-6">
            <div className="space-y-2">
              <div className="font-lexend-deca capitalize">
                <span className="font-medium">Address: </span>{" "}
                <span className="text-gray-500">
                  {order.billingInfo.streetAddress +
                    ", " +
                    order.billingInfo.city}
                </span>
              </div>
              <div className="font-lexend-deca capitalize">
                <span className="font-medium">state: </span>{" "}
                <span className="text-gray-500">{order.billingInfo.state}</span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">country: </span>{" "}
                <span className="text-gray-500">
                  {order.billingInfo.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

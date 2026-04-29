import { getCourseOrderById } from "@/actions/courseOrder";
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
  transactionsList,
} from "@/constants/order-data";
import { CourseOrderType, OrderedCourseType } from "@/types/CourseOrder";
import { getImageUrl } from "@/utils/getImageUrl";
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
  const { data: order }: { data: CourseOrderType } = await getCourseOrderById(id);
  return (
    <div>
      <PageHeading
        pageTitle={`Order #${order.orderId}`}
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Orders", href: "/e-learning/orders" },
          {
            name: `#${id}`,
            href: `/e-learning/orders/${id}`,
          },
        ]}
      >
        <Link href={`/dashboard/e-learning/orders/edit/${id}`}>
          <Button variant="blue">
            <span>Edit Orders</span>
          </Button>
        </Link>
      </PageHeading>

      <div className="hidden sm:flex gap-4 flex-col sm:flex-row items-start sm:items-center text-sm font-lexend-deca text-gray-600 border-y py-4 my-5 ">
        <p className="sm:border-r w-fit pr-4">
          {GetTime(new Date(order?.createdAt), true)}
        </p>
        <p className="sm:border-r w-fit sm:px-4">{order?.totalCourse} Items</p>
        <p className="sm:border-r w-fit sm:px-4">Total ${(order?.totalPrice).toFixed(2)}</p>
        <button className="bg-green-300 text-green-800 px-3 py-1 text-sm rounded-2xl sm:ml-4">
          {order?.paymentStatus}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 lg:gap-4 xl:gap-8 2xl:gap-16">
        <div className=" mt-6 sm:mt-0">
          <Table className=" !rounded-md overflow-hidden">
            <TableCaption></TableCaption>
            <TableHeader className="bg-stone-100 ">
              <TableRow className="uppercase !h-11">
                <TableHead className="w-[400px] space-x-5 font-bold text-gray-500">
                  Course
                </TableHead>

                <TableHead className="font-bold text-gray-500">
                  Course Price
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
              {order.courses?.map((courseInfo: OrderedCourseType, index: number) => (
                <TableRow key={courseInfo?._id?.orderId || + index}>
                  <TableCell>
                    <Link href={`/shop/${courseInfo?._id?.slug}`}>
                      <Image
                        src={getImageUrl(courseInfo._id.thumbnail, "courses")}
                        width={100}
                        height={100}
                        alt={courseInfo._id.title}
                        className="w-25 h-25 object-cover rounded-lg"
                      />
                      <h5 className="font-semibold mt-2">{courseInfo._id.title}</h5>
                      <p className="text-sm text-gray-600">
                        {courseInfo._id.category}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell>${courseInfo.price}</TableCell>
                  <TableCell>{courseInfo.quantity}</TableCell>
                  <TableCell className="font-medium">
                    ${Number(courseInfo.price) * Number(courseInfo.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {order.courses.length < 1 && (
            <div className="w-fit mx-auto">
              <EmptyItemIcon />
              <p className="text-gray-500 text-center">No Data</p>
            </div>
          )}

          <hr className="mt-10 mb-8" />
          <div className="flex gap-10 lg:flex-col flex-col md:flex-row xl:flex-row">
            
            {/* cart */}
            <div className="md:w-1/2 w-full lg:w-full xl:w-1/2 ml-auto space-y-4 border-2 p-5 shadow">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>${(order.subtotal).toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span>${(order.totalPrice).toFixed(2)}</span>
              </div>
            </div>
            {/* cart end */}
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
                    ${(order.totalPrice).toFixed(2)}
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
                  Order {step.status}
                  <span className="size-5 bg-gray-200 rounded-full inline-block absolute -left-2.5 top-1/2 -translate-y-1/2 z-[1]"></span>
                  {step.status == order.status && (
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
              src={
                getImageUrl(order?.customer?.avatar, "profile") ||
                "/images/user.png"
              }
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
              {/* <p className="text-gray-500 text-sm">(316) 555-0116</p> */}
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
                  {order?.streetAddress}
                </span>
              </div>
              <div className="font-lexend-deca capitalize">
                <span className="font-medium">zip: </span>{" "}
                <span className="text-gray-500">
                  {order?.zip}
                </span>
              </div>
              <div className="font-lexend-deca capitalize">
                <span className="font-medium">City: </span>{" "}
                <span className="text-gray-500">
                  {order?.city}
                </span>
              </div>
              <div className="font-lexend-deca capitalize">
                <span className="font-medium">state: </span>{" "}
                <span className="text-gray-500">{order?.state}</span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">country: </span>{" "}
                <span className="text-gray-500">
                  {order?.country}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">phone: </span>{" "}
                <span className="text-gray-500">
                  {order?.phoneNumber}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">phone 2: </span>{" "}
                <span className="text-gray-500">
                  {order?.otherPhoneNumber}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">apartment: </span>{" "}
                <span className="text-gray-500">
                  {order?.apartment}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">Full Name: </span>{" "}
                <span className="text-gray-500">
                  {order?.fullName}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">Spouse Name: </span>{" "}
                <span className="text-gray-500">
                  {order?.spouseName}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">how Did You Hear About Us: </span>{" "}
                <span className="text-gray-500">
                  {order?.howDidYouHearAboutUs}
                </span>
              </div>
              <div className="font-lexend-deca  capitalize">
                <span className="font-medium">Order Notes: </span>{" "}
                <span className="text-gray-500">
                  {order?.orderNotes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

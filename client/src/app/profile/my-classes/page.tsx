import { getPrivateClassOrdersByQuery } from "@/actions/privateClassOrder";
import ClassCard from "@/components/common/ClassCard";
import CourseCard from "@/components/common/CourseCard";
import FrontPageHeading from "@/components/dashboard/common/FrontPageHeading";
import { Button } from "@/components/ui/button";
import { ClassOrderCardType } from "@/types/ClassOrder";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Myclasses({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: orders } = await getPrivateClassOrdersByQuery(query);
  console.log(orders)
  return (
    <div>
      <FrontPageHeading
        pageTitle="My classes"
        breadcrumbList={[
          { name: "Classes", href: "/classes" },
          { name: "My Classes", href: "/profile/my-classes" },
        ]}
      >
        <Link href={`/classes`}>
          <Button variant="blue">
            <span>Buy More</span>
          </Button>
        </Link>
      </FrontPageHeading>
      {
        orders.length > 0 ? (
          orders?.map((order: ClassOrderCardType, index: number) => {
            return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" key={index}>
                        <ClassCard key={order.classes[0]._id._id} privateClass={true} title={order?.classes[0]?._id?.title || ""} slug={`${order.classes[0]._id?.slug}` || ""} thumbnail={order.classes[0]._id?.thumbnail || ""} speaker={order?.classes[0]?._id?.speaker}/>
                    </div>)
          })
        ) : (
          <div className="flex flex-col items-center justify-center w-full mt-36 gap-4">
            <Icon icon="mdi:folder-search-outline" width="50" height="50" className="text-gray-400"/>
            <p className="text-gray-500">No classes found.</p>
          </div>
        )
      }
    </div>
  );
}

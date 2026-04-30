import { getPrivateCourseOrdersByQuery } from "@/actions/privateCourseOrder";
import CourseCard from "@/components/common/CourseCard";
import FrontPageHeading from "@/components/dashboard/common/FrontPageHeading";
import { Button } from "@/components/ui/button";
import { CourseOrderCardType } from "@/types/CourseOrder";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function MyCourses({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: orders } = await getPrivateCourseOrdersByQuery(query);
  console.log(orders)
  return (
    <div>
      <FrontPageHeading
        pageTitle="My Courses"
        breadcrumbList={[
          { name: "Courses", href: "/courses" },
          { name: "My Courses", href: "/profile/my-courses" },
        ]}
      >
        <Link href={`/courses`}>
          <Button variant="blue">
            <span>Buy More</span>
          </Button>
        </Link>
      </FrontPageHeading>
      {
        orders.length > 0 ? (
          orders?.map((order: CourseOrderCardType, index: number) => {
            return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" key={index}>
                        <CourseCard key={order.courses[0]._id._id} previewslug={`${order.courses[0]._id?.slug}`} title={order?.courses[0]?._id?.title || ""} slug={`${order.courses[0]._id?.slug}` || ""} thumbnail={order.courses[0]._id?.thumbnail || ""} speaker={order?.courses[0]?._id?.speaker}/>
                    </div>)
          })
        ) : (
          <div className="flex flex-col items-center justify-center w-full mt-36 gap-4">
            <Icon icon="mdi:folder-search-outline" width="50" height="50" className="text-gray-400"/>
            <p className="text-gray-500">No courses found.</p>
          </div>
        )
      }
    </div>
  );
}

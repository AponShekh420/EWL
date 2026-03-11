import PageHeading from "@/components/dashboard/common/PageHeading";
import CourseTable from "@/components/dashboard/common/tables/CourseTable";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Courses({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const res = await fetch(
    BASE_URL + "/api/e-learning/courses-by-filter?" + query,
  );
  const { data: coursesData, pagination } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  console.log(coursesData);
  return (
    <div>
      <PageHeading
        pageTitle="Courses"
        breadcrumbList={[
          { name: "E-Learning", href: "" },
          { name: "Course List", href: "/e-learning/courses" },
        ]}
      >
        <Button variant="outline">
          <Icon icon="charm:upload" width="32" height="32" />
          <span>Export</span>
        </Button>
        <Link href="/dashboard/e-learning/courses/add">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Courses</span>
          </Button>
        </Link>
      </PageHeading>

      {
        coursesData && (
          <CourseTable courses={coursesData} pagination={pagination}/>
        )
      }
    </div>
  );
}

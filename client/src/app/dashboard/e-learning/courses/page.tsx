import PageHeading from "@/components/dashboard/common/PageHeading";
import CourseTable from "@/components/dashboard/common/tables/CourseTable";
import { Button } from "@/components/ui/button";
import { coursesData } from "@/constants/courses";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Products() {
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

      <CourseTable courses={coursesData} />
    </div>
  );
}

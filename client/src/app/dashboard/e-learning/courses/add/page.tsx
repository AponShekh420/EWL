import PageHeading from "@/components/dashboard/common/PageHeading";
import CreateCourseForm from "@/components/dashboard/e-learning/courses/CourseForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateCourse() {
  return (
    <div>
      <PageHeading
        pageTitle="Add Course"
        breadcrumbList={[
          { name: "E-Learning", href: "" },
          { name: "Courses", href: "/e-learning/courses" },
          { name: "Add", href: "/e-learning/courses/add" },
        ]}
      >
        <Link href="/dashboard/e-learning/courses">
          <Button variant="blue">
            <span>See Courses</span>
          </Button>
        </Link>
      </PageHeading>
      <CreateCourseForm />
    </div>
  );
}

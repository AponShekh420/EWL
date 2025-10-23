import PageHeading from "@/components/dashboard/common/PageHeading";
import CourseForm from "@/components/dashboard/e-learning/courses/CourseForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditCourse({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <PageHeading
        pageTitle="Edit Course"
        breadcrumbList={[
          { name: "E-Learning", href: "" },
          { name: "Courses", href: "/e-learning/courses" },
          { name: `Edit`, href: `/e-learning/courses/edit/${slug}` },
        ]}
      >
        <Link href="/dashboard/e-learning/courses">
          <Button variant="blue">
            <span>See Courses</span>
          </Button>
        </Link>
      </PageHeading>
      <CourseForm />
    </div>
  );
}

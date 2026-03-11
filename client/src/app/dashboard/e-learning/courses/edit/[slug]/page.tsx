import PageHeading from "@/components/dashboard/common/PageHeading";
import CourseForm from "@/components/dashboard/e-learning/courses/CourseForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function EditCourse({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const [courseRes, speakerRes] = await Promise.all([
    fetch(BASE_URL + "/api/e-learning/course/" + slug),
    fetch(BASE_URL + "/api/account/speakers"),
  ]);

  const [courseData, speakersData] = await Promise.all([
    courseRes.json(),
    speakerRes.json(),
  ]);
  if (!courseRes.ok) {
    throw new Error("Failed to fetch course details");
  }
  if (!speakerRes.ok) {
    throw new Error("Failed to fetch speakers");
  }
  const speakers = speakersData.data.map(
    (speaker: { firstName: string; lastName: string; _id: string }) => ({
      label: speaker?.firstName + " " + speaker?.lastName,
      value: speaker._id,
    })
  );
  return (
    <div>
      <PageHeading
        pageTitle="Edit Course"
        breadcrumbList={[
          { name: "E-learning", href: "" },
          { name: "Courses", href: "/e-learning/courses" },
          { name: `Edit`, href: `/e-learning/courses/edit/${slug}` },
          { name: `${slug}`, href: `/e-learning/courses/edit/${slug}` },
        ]}
      >
        <Link href="/dashboard/e-learning/courses">
          <Button variant="blue">
            <span>See Courses</span>
          </Button>
        </Link>
      </PageHeading>
      <CourseForm courseData={courseData?.data} speakers={speakers}/>
    </div>
  );
}

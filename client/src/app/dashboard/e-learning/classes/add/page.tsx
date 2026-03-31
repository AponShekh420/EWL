import PageHeading from "@/components/dashboard/common/PageHeading";
import CreateClassForm from "@/components/dashboard/e-learning/classes/ClassForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function CreateCourse() {
    const res = await fetch(BASE_URL + "/api/account/speakers");
    const { data: speakersData } = await res?.json();
    const speakers = speakersData?.map(
      (speaker: { firstName: string; lastName: string; _id: string }) => ({
        label: speaker?.firstName + " " + speaker?.lastName,
        value: speaker._id,
      })
    );
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
      <CreateClassForm speakers={speakers} />
    </div>
  );
}

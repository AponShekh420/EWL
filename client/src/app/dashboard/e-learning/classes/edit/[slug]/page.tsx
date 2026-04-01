import PageHeading from "@/components/dashboard/common/PageHeading";
import ClassForm from "@/components/dashboard/e-learning/classes/ClassForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function EditClass({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const [classRes, speakerRes] = await Promise.all([
    fetch(BASE_URL + "/api/e-learning/class/" + slug),
    fetch(BASE_URL + "/api/account/speakers"),
  ]);

  const [classData, speakersData] = await Promise.all([
    classRes.json(),
    speakerRes.json(),
  ]);
  if (!classRes.ok) {
    throw new Error("Failed to fetch class details");
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
        pageTitle="Edit Class"
        breadcrumbList={[
          { name: "E-learning", href: "" },
          { name: "Classes", href: "/e-learning/classes" },
          { name: `Edit`, href: `/e-learning/classes/edit/${slug}` },
          { name: `${slug}`, href: `/e-learning/classes/edit/${slug}` },
        ]}
      >
        <Link href="/dashboard/e-learning/classes">
          <Button variant="blue">
            <span>See Classes</span>
          </Button>
        </Link>
      </PageHeading>
      <ClassForm classData={classData?.data} speakers={speakers}/>
    </div>
  );
}

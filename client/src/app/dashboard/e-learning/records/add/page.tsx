import PageHeading from "@/components/dashboard/common/PageHeading";
import RecordsForm from "@/components/dashboard/e-learning/records/RecordsForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateRecord() {
  return (
    <div>
      <PageHeading
        pageTitle="Add Record"
        breadcrumbList={[
          { name: "E-Learning", href: "" },
          { name: "Records", href: "/e-learning/records" },
          { name: "Add", href: "/e-learning/records/add" },
        ]}
      >
        <Link href="/dashboard/e-learning/courses">
          <Button variant="blue">
            <span>See Records</span>
          </Button>
        </Link>
      </PageHeading>
      <RecordsForm />
    </div>
  );
}

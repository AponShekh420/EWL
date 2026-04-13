import PageHeading from "@/components/dashboard/common/PageHeading";
import AddClassPage from "@/components/dashboard/e-learning/records/RecordsForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateRecords() {
  return (
    <div>
      <PageHeading
        pageTitle="Create Record"
        breadcrumbList={[
          { name: "E-commerce", href: "/" },
          { name: "Records", href: "/e-learning/records" },
          { name: "Create", href: "/e-learning/records/add" },
        ]}
      >
        <Link href="/dashboard/e-learning/records">
          <Button variant="blue">
            <span>See Records</span>
          </Button>
        </Link>
      </PageHeading>
      <AddClassPage />
    </div>
  );
}

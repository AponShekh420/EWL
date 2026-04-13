import PageHeading from "@/components/dashboard/common/PageHeading";
import AddClassPage from "@/components/dashboard/e-learning/records/RecordsForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function UpdateRecords({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await fetch(BASE_URL + "/api/e-learning/recording/" + id);
  const { data: record } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch order details");
  }
  return (
    <div>
      <PageHeading
        pageTitle="Update Record"
        breadcrumbList={[
          { name: "E-learning", href: "/" },
          { name: "Records", href: "/e-learning/records" },
          { name: "Update", href: `/e-learning/records/edit/${id}` },
        ]}
      >
        <Link href="/dashboard/e-learning/records">
          <Button variant="blue">
            <span>See Records</span>
          </Button>
        </Link>
      </PageHeading>
      <AddClassPage record={record} />
    </div>
  );
}

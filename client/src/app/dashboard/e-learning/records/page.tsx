import PageHeading from "@/components/dashboard/common/PageHeading";
import RecordTable from "@/components/dashboard/common/tables/RecordTable";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import { queryFormatter } from "@/utils/queryFormatter";
import Link from "next/link";

export default async function Records({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const res = await fetch(
    BASE_URL + "/api/e-learning/recording-by-filter" + query,
    {cache: "no-store"}
  );
  const { data: recordings, pagination } = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch recording detail");
  }
  return (
    <div>
      <PageHeading
        pageTitle="Records"
        breadcrumbList={[
          { name: "E-Learning", href: "" },
          { name: "Records", href: "/e-learning/records" },
        ]}
      >
        <Link href="/dashboard/e-learning/records/add">
          <Button variant="blue">Create record</Button>
        </Link>
      </PageHeading>
      <RecordTable records={recordings} pagination={pagination} />
    </div>
  );
}

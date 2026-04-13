import PageHeading from "@/components/dashboard/common/PageHeading";
import ClassTable from "@/components/dashboard/common/tables/ClassTable";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Courses({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const res = await fetch(
    BASE_URL + "/api/e-learning/classes-by-filter?" + query,
  );
  const { data: classesData, pagination } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch classes");
  }
  return (
    <div>
      <PageHeading
        pageTitle="Classes"
        breadcrumbList={[
          { name: "E-Learning", href: "" },
          { name: "Class List", href: "/e-learning/classes" },
        ]}
      >
        <Button variant="outline">
          <Icon icon="charm:upload" width="32" height="32" />
          <span>Export</span>
        </Button>
        <Link href="/dashboard/e-learning/classes/add">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Classes</span>
          </Button>
        </Link>
      </PageHeading>

      {
        classesData && (
          <ClassTable classes={classesData} pagination={pagination}/>
        )
      }
    </div>
  );
}

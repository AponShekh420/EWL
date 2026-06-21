import { getResourcesByQuery } from "@/actions/resources";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ResourcesTable from "@/components/dashboard/common/tables/ResourcesTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Resources({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: resourcesData, pagination } = await getResourcesByQuery(query);

  return (
    <div>
      <PageHeading
        pageTitle="Resources"
        breadcrumbList={[
          { name: "Resources", href: "/resources" },
          { name: "List", href: "/resources" },
        ]}
      >
        <Button variant="outline">
          <Icon icon="charm:upload" width="32" height="32" />
          <span>Export</span>
        </Button>
        <Link href="/dashboard/resources/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Resources</span>
          </Button>
        </Link>
      </PageHeading>
      {resourcesData && (
        <ResourcesTable resources={resourcesData} pagination={pagination} />
      )}
    </div>
  );
}

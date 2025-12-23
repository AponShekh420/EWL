import PageHeading from "@/components/dashboard/common/PageHeading";
import UsersTable from "@/components/dashboard/common/tables/UsersTable";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";

import Link from "next/link";

export default async function Users({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const res = await fetch(BASE_URL + "/api/account/users?" + query);
  const { data: userData, pagination } = await res.json();
  console.log(userData);
  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }
  return (
    <div>
      <PageHeading
        pageTitle="Users List"
        breadcrumbList={[
          { name: "Users", href: "/users" },
          { name: "Lists", href: "/users" },
        ]}
      >
        <Link href="/dashboard/users/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Create User</span>
          </Button>
        </Link>
      </PageHeading>
      <UsersTable users={userData} pagination={pagination} />
    </div>
  );
}

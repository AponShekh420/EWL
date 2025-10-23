import PageHeading from "@/components/dashboard/common/PageHeading";
import UsersTable from "@/components/dashboard/common/tables/UsersTable";
import { Button } from "@/components/ui/button";
import { usersData } from "@/constants/users-data";
import { Icon } from "@iconify/react";

import Link from "next/link";

export default function Users() {
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
      <UsersTable
        users={usersData.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt),
        }))}
      />
    </div>
  );
}

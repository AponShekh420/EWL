import PageHeading from "@/components/dashboard/common/PageHeading";
import UserForm from "@/components/dashboard/ecommerce/users/UserForm";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

import Link from "next/link";

export default function CreateUser() {
  return (
    <div>
      <PageHeading
        pageTitle="User Creation"
        breadcrumbList={[
          { name: "Users", href: "/users" },
          { name: "Create", href: "/users/create" },
        ]}
      >
        <Link href="/dashboard/users/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Create User</span>
          </Button>
        </Link>
      </PageHeading>
      <UserForm />
    </div>
  );
}

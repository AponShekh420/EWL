import PageHeading from "@/components/dashboard/common/PageHeading";
import UserForm from "@/components/dashboard/ecommerce/users/UserForm";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function EditUser({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div>
      <PageHeading
        pageTitle="Edit User"
        breadcrumbList={[
          { name: "Users", href: "/users" },
          { name: "Edit", href: `/users/edit/${id}` },
        ]}
      >
        <Link href="/dashboard/users">
          <Button variant="blue">
            <span>See Users</span>
          </Button>
        </Link>
      </PageHeading>
      <UserForm />
    </div>
  );
}

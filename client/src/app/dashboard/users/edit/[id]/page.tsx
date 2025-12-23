import PageHeading from "@/components/dashboard/common/PageHeading";
import UserForm from "@/components/dashboard/users/UserForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";

import Link from "next/link";

export default async function EditUser({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(BASE_URL + "/api/account/users/" + id);
  const { data: user } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }

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
      <UserForm user={user} />
    </div>
  );
}

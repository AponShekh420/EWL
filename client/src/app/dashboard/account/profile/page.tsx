import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/authLib";
import { BASE_URL } from "@/utils/envVariable";
import { Icon } from "@iconify/react";

import Link from "next/link";
import ProfileArea from "./ProfileArea";

export default async function Profile() {
  const session = await getSession();

  const res = await fetch(`${BASE_URL}/api/account/users/${session?.id}`);
  const { data: user } = await res.json();
  return (
    <div>
      <PageHeading
        pageTitle="User Profile"
        breadcrumbList={[
          { name: "Account", href: "/account/profile" },
          { name: "Profile", href: "/account/profile" },
        ]}
      >
        <Link href="/dashboard/users/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Create User</span>
          </Button>
        </Link>
      </PageHeading>
      <ProfileArea user={user} />
    </div>
  );
}

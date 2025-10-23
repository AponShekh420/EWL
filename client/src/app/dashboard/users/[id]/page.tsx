import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import { usersData } from "@/constants/users-data";
import { UserType } from "@/types/User";
import { GetTime } from "@/utils/getTime";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default async function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const FindUserById = usersData.find((item) => item.id === id);
  const user = {
    ...FindUserById,
    createdAt: FindUserById?.createdAt
      ? new Date(FindUserById.createdAt)
      : new Date(),
  } as UserType;

  return (
    <div>
      <PageHeading
        pageTitle="User Details"
        breadcrumbList={[
          { name: "Users", href: `/users/${id}` },
          { name: id, href: `/users/${id}` },
        ]}
      >
        <Link href="/dashboard/users/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Create User</span>
          </Button>
        </Link>
      </PageHeading>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-4 my-10 ">
        <div>
          <h5 className="font-bold text-lg">User specific information</h5>
          <p className=" text-gray-700 mt-2">
            You can see here specific user details by Id
          </p>
        </div>
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-8">
            <Image
              src={user.avatar || "/images/user.png"}
              width={400}
              height={400}
              alt="avatar"
              className="border p-4 rounded-lg max-w-[400px] max-h-[400px] w-full h-full "
            />
            <div>
              <h5 className="font-bold text-lg mb-5">Profile info</h5>
              <div className="space-y-8">
                <p className="border py-3 px-4 rounded-sm">
                  <strong>Name:</strong> {user.fullName}
                </p>
                <p className="border py-3 px-4 rounded-sm">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="border py-3 px-4 rounded-sm">
                  <strong>Role:</strong> {user.role}
                </p>
                <p className="border py-3 px-4 rounded-sm">
                  <strong>Joined:</strong> {GetTime(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

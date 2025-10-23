import InputBox from "@/components/common/InputBox";
import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Image from "next/image";

import Link from "next/link";

export default function Profile() {
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
      <div className="mt-10 grid sm:grid-cols-[300px_2fr] gap-8">
        <div>
          <div>
            <h1 className="font-bold font-inter text-lg mb-4 text-gray-700">
              Account management
            </h1>
            <div>
              <Image
                src="/images/user.png"
                width={300}
                height={300}
                alt="avatar"
                className="border p-4 rounded-lg w-full"
              />
              <Button variant="outline" className="w-full mt-4">
                Update Photo
              </Button>
            </div>
          </div>
          <form className="mt-8 space-y-6">
            <InputBox
              name="old-password"
              placeholder="Enter old password"
              label="Old Password"
            />
            <InputBox
              name="new-password"
              placeholder="Enter new password"
              label="New Password"
            />
            <Button variant="outline" className="w-full mt-2">
              Change Password
            </Button>
          </form>
        </div>
        <div className="border-l pl-8">
          <h1 className="font-bold font-inter text-lg mb-4 text-gray-700">
            Profile Information
          </h1>
          <div className="mt-14">
            <div>
              <div>
                <div className="grid xl:grid-cols-2 gap-8">
                  <InputBox
                    label="Full Name"
                    placeholder="Full name"
                    name="full-name"
                  />
                  <InputBox label="Email" placeholder="Email" name="email" />
                </div>
              </div>

              <Button className="ml-auto w-fit block my-8" variant="blue">
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

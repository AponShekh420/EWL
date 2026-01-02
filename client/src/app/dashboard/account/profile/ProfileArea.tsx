"use client";
import InputBox from "@/components/common/InputBox";
import { Button } from "@/components/ui/button";
import { UserErrorType, UserType } from "@/types/User";
import { BASE_URL } from "@/utils/envVariable";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileArea({ user }: { user: UserType }) {
  const avatarRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<UserErrorType>({});
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [userForm, setUserForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const router = useRouter();
  //change profile photo handler
  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    if (!file) return;
    formData.append("avatar", file);

    const res = await fetch(`${BASE_URL}/api/account/profile/${user._id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    router.refresh();
    console.log(data);
  };
  //password change handler
  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", passwordForm.oldPassword);
    formData.append("newPassword", passwordForm.newPassword);
    formData.append("userId", user._id);

    if (!passwordForm.oldPassword) {
      setErrors({
        oldPassword: {
          msg: "Old password is required",
          type: "string",
          path: "oldPassword",
          location: "body",
          value: passwordForm.oldPassword,
        },
      });
      return;
    }

    if (!passwordForm.newPassword) {
      setErrors({
        newPassword: {
          msg: "New password is required",
          type: "string",
          path: "newPassword",
          location: "body",
          value: passwordForm.newPassword,
        },
      });
      return;
    }
    const res = await fetch(`${BASE_URL}/api/account/profile/${user._id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Password updated successfully");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } else {
      toast.error(data.message || "Failed to update password");
      setErrors(data.errors || {});
    }
  };

  //profile info update handler
  const handleProfileInfo = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", userForm.firstName);
    formData.append("lastName", userForm.lastName);
    formData.append("email", userForm.email);
    formData.append("userId", user._id);

    if (!userForm.firstName) {
      setErrors({
        firstName: {
          msg: "First name is required",
          type: "string",
          path: "firstName",
          location: "body",
          value: userForm.firstName,
        },
      });
      return;
    }

    if (!userForm.lastName) {
      setErrors({
        lastName: {
          msg: "Last name is required",
          type: "string",
          path: "lastName",
          location: "body",
          value: userForm.lastName,
        },
      });
      return;
    }
    if (!userForm.email) {
      setErrors({
        email: {
          msg: "Email is required",
          type: "string",
          path: "email",
          location: "body",
          value: userForm.email,
        },
      });
      return;
    }

    const res = await fetch(`${BASE_URL}/api/account/profile/${user._id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Profile information updated successfully");
      //   setUserForm({ firstName: "", lastName: "", email: "" });
    } else {
      toast.error(data.message || "Failed to update profile information");
      setErrors(data.errors || {});
    }
  };
  return (
    <div className="mt-10 grid sm:grid-cols-[300px_2fr] gap-8">
      <div>
        <div>
          <h1 className="font-bold font-inter text-lg mb-4 text-gray-700">
            Account management
          </h1>
          <div>
            <Image
              src={user?.avatar || "/default-avatar.png"}
              width={300}
              height={300}
              alt="avatar"
              className="border p-4 rounded-lg w-full"
            />

            <input
              ref={avatarRef}
              type="file"
              id="avatar-upload"
              className="mt-4"
              onChange={handleAvatarChange}
              hidden
            />
            <Button
              onClick={() => avatarRef.current?.click()}
              variant="outline"
              className="w-full mt-4"
            >
              Update Photo
            </Button>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handlePasswordChange}>
          <InputBox
            name="old-password"
            placeholder="Enter old password"
            label="Old Password"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({
                ...prev,
                oldPassword: e.target.value,
              }))
            }
            error={errors?.oldPassword?.msg}
          />
          <InputBox
            name="new-password"
            placeholder="Enter new password"
            label="New Password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            error={errors?.newPassword?.msg}
          />
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>
        </form>
      </div>
      <div className="border-l pl-8">
        <h1 className="font-bold font-inter text-lg mb-4 text-gray-700">
          Profile Information
        </h1>
        <div className="mt-14">
          <form onSubmit={handleProfileInfo}>
            <div>
              <div className="grid xl:grid-cols-2 gap-8">
                <InputBox
                  label="First Name"
                  placeholder="Full name"
                  name="full-name"
                  value={userForm.firstName}
                  onChange={(e) =>
                    setUserForm((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  error={errors?.firstName?.msg}
                />
                <InputBox
                  label="Last Name"
                  placeholder="Full name"
                  name="full-name"
                  value={userForm.lastName}
                  onChange={(e) =>
                    setUserForm((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  error={errors?.lastName?.msg}
                />
                <InputBox
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  error={errors?.email?.msg}
                />
              </div>
            </div>

            <Button className="ml-auto w-fit block my-8" variant="blue">
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

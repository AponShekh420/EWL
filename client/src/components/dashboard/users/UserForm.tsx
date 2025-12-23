"use client";
import InputBox from "@/components/common/InputBox";
import SelectBox from "@/components/common/SelectBox";
import TextBox from "@/components/common/TextBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  addUserField,
  resetUserFields,
} from "@/redux/features/user/userFormSlice";
import { RootState } from "@/redux/store";
import { UserType } from "@/types/User";
import { createFormData } from "@/utils/createFormData";
import { BASE_URL } from "@/utils/envVariable";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
export default function UserForm({ user }: { user?: UserType }) {
  const userForm = useSelector((state: RootState) => state.userForm);
  const dispatch = useDispatch();
  const path = usePathname();
  const router = useRouter();
  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = createFormData(userForm);

    if (path.includes("edit")) {
      if (!user?._id) return;
      const res = await fetch(BASE_URL + "/api/account/users/" + user?._id, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(resetUserFields());
        setTimeout(() => {
          router.push("/dashboard/users");
        }, 2000);
      }
    } else {
      const res = await fetch(BASE_URL + "/api/account/user", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(resetUserFields());
      }
    }
  };
  useEffect(() => {
    if (!user) return;
    dispatch(addUserField({ ...user, password: "" }));
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="mt-14">
      <form
        onSubmit={onHandleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-4 xl:gap-8 2xl:gap-16"
      >
        <div>
          <h5 className="font-bold text-lg">User information</h5>
          <p className=" text-gray-700 mt-2">
            Add user relatated information from here
          </p>
        </div>
        <div className="order-2 lg:order-1">
          <div>
            <div className="grid sm:grid-cols-2 gap-8">
              <InputBox
                label="Username"
                placeholder="Username"
                name="userName"
                value={userForm.userName}
                onChange={(e) =>
                  dispatch(addUserField({ userName: e.target.value }))
                }
              />
              <InputBox
                label="First Name"
                placeholder="First Name"
                name="firstName"
                value={userForm.firstName}
                onChange={(e) =>
                  dispatch(addUserField({ firstName: e.target.value }))
                }
              />
              <InputBox
                label="Last Name"
                placeholder="Last Name"
                name="lastName"
                value={userForm.lastName}
                onChange={(e) =>
                  dispatch(addUserField({ lastName: e.target.value }))
                }
              />
              <InputBox
                label="Email"
                placeholder="Email"
                name="email"
                value={userForm.email}
                onChange={(e) =>
                  dispatch(addUserField({ email: e.target.value }))
                }
              />
              <InputBox
                label="Password"
                placeholder="Password"
                name="password"
                value={userForm.password}
                onChange={(e) =>
                  dispatch(addUserField({ password: e.target.value }))
                }
              />
              <InputBox
                label="Confirm password"
                placeholder="Confirm password"
                name="cpassword"
                value={userForm.cpassword}
                onChange={(e) =>
                  dispatch(addUserField({ cpassword: e.target.value }))
                }
              />
              <SelectBox
                label="Gender"
                placeholder="Gender"
                name="gender"
                value={userForm.gender}
                defaultValue={userForm.gender}
                onChange={(val) => dispatch(addUserField({ gender: val }))}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />
              <div>
                <Label className="mb-4">Upload your avatar (optional)</Label>{" "}
                <Input
                  name="avatar"
                  type="file"
                  onChange={(e) =>
                    dispatch(
                      addUserField({ avatar: e.target.files?.[0] ?? null })
                    )
                  }
                />
              </div>
              <div className="capitalize ">
                <Label className="mb-4">Are you an orthodox Jew?</Label>
                <RadioGroup
                  value={userForm.isOrthodoxJew ? "yes" : "no"}
                  onValueChange={(val) =>
                    dispatch(addUserField({ isOrthodoxJew: val }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" className="size-5" />
                    <Label htmlFor="option-one">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="size-5" />
                    <Label htmlFor="out-of-stock">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="capitalize ">
                <Label className="mb-4">
                  Are you married or ever been married?
                </Label>
                <RadioGroup
                  value={userForm.maritalStatus ? "yes" : "no"}
                  onValueChange={(val) =>
                    dispatch(addUserField({ maritalStatus: val }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" className="size-5" />
                    <Label htmlFor="option-one">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="size-5" />
                    <Label htmlFor="option-one">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="other"
                      id="other"
                      className="size-5"
                    />
                    <Label htmlFor="option-one">Other</Label>
                  </div>
                  {userForm.maritalStatus === "other" && (
                    <InputBox name="write here" label="" />
                  )}
                </RadioGroup>
              </div>
            </div>
            <div className="space-y-8 mt-8">
              <div className="capitalize ">
                <Label className="mb-4">
                  Do you keep Shabbos ,Kashrus and Taharas Hamishpacha?
                </Label>
                <RadioGroup
                  value={userForm.keepsMitzvos ? "yes" : "no"}
                  onValueChange={(val) =>
                    dispatch(
                      addUserField({
                        keepsMitzvos: val,
                      })
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" className="size-5" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="size-5" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
                <p className="mt-5 text-xs text-gray-400">
                  to verify that you are our intended target audience, please
                  answer the following questions
                </p>
              </div>
              <InputBox
                label="How long is the preparation (Chafifa ) for mikvah on the day of mikvah supposed to take?"
                placeholder="chafifa duration"
                name="chafifaDuration"
                value={userForm.chafifaDuration}
                onChange={(e) =>
                  dispatch(addUserField({ chafifaDuration: e.target.value }))
                }
              />
              <TextBox
                label="if hot chicken soup spilled in your dairy sink, what would you do?"
                placeholder="Describe here"
                name="Chicken Soup In DairySink"
                value={userForm.chickenSoupInDairySink}
                onChange={(e) =>
                  dispatch(
                    addUserField({ chickenSoupInDairySink: e.target.value })
                  )
                }
              />
            </div>
          </div>

          <Button className="ml-auto w-fit block my-8" variant="blue">
            {path.includes("edit") ? "Update User" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

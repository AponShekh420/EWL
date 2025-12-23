"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

import { useDispatch, useSelector } from "react-redux";
import { addUserField, resetUserFields } from "@/redux/auth/registerFormSlice";
import type { RootState } from "@/redux/store";
import UserErrors from "@/types/UserErrors";
import { useState } from "react";
import { createFormData } from "@/utils/createFormData";
import toast from "react-hot-toast";
import { BASE_URL } from "@/utils/envVariable";

const Register = () => {
  const [errors, setErrors] = useState<UserErrors>({});
  const dispatch = useDispatch();

  // 👇 same redux state
  const form = useSelector(
    (state: RootState) => state.registerFrom
  );

  const handleChange = (field: string, value: string) => {
    dispatch(addUserField({ [field]: value }));
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const formData = createFormData(form);

    console.log("Submitting registration form:", formData.get("userName"));
    const res = await fetch(BASE_URL + "/api/auth/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log("Registration response:", data);

    if (!data.success) {
      setErrors(data.errors || {});
    }
    if (data.success) {
      toast.success(data.message);
      dispatch(resetUserFields());
    }
  };

  return (
    <div>
      <p className="text-[#333333] mt-4">
        Ohel Miriam is a sensitive site for frum adults looking to learn more or buy products related to marital intimacy. Due to the nature of our content, we require all users to create a free account in order to view the website in full. We will not pass on your information to a third party.
        Put a button to the form
      </p>

      <form className="w-ful mt-5" onSubmit={onHandleSubmit}>
        <FieldSet>
          <FieldGroup className="grid md:grid-cols-2 grid-cols-1">
            <Field>
              <FieldLabel htmlFor="username">
                Username<span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="example123"
                value={form.userName}
                onChange={(e) =>
                  handleChange("userName", e.target.value)
                }
              />
              {errors?.userName && (
                <FieldDescription className="text-red-600">
                  {errors?.userName?.msg}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="first-name">
                First Name<span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="first-name"
                type="text"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={(e) =>
                  handleChange("firstName", e.target.value)
                }
              />
              {errors?.firstName && (
                <FieldDescription className="text-red-600">
                  {errors?.firstName?.msg}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="last-name">
                Last Name<span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="last-name"
                type="text"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={(e) =>
                  handleChange("lastName", e.target.value)
                }
              />
              {errors?.lastName && (
                <FieldDescription className="text-red-600">
                  {errors?.lastName?.msg}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">
                Email Address<span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
              />
              {errors?.email && (
                <FieldDescription className="text-red-600">
                  {errors?.email?.msg}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                Password<span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  handleChange("password", e.target.value)
                }
              />
              {errors?.password && (
                <FieldDescription className="text-red-600">
                  {errors?.password?.msg}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password<span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={form.cpassword}
                onChange={(e) =>
                  handleChange("cpassword", e.target.value)
                }
              />
              {errors?.cpassword && (
                <FieldDescription className="text-red-600">
                  {errors?.cpassword?.msg}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Gender<span className="text-red-600">*</span>
              </FieldLabel>
              <Select
                value={form.gender}
                onValueChange={(value) =>
                  handleChange("gender", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors?.gender && (
                <FieldDescription className="text-red-600">
                  {errors?.gender?.msg}
                </FieldDescription>
              )}
            </Field>

            {/* redio */}
            <FieldSet>
              <FieldLabel>
                Are you an Orthodox Jew?
                <span className="text-red-600">*</span>
              </FieldLabel>
              <RadioGroup
                defaultValue="yes"
                value={form.isOrthodoxJew}
                onValueChange={(value) =>
                  handleChange("isOrthodoxJew", value)
                }
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="yes" id="yes" />
                  <FieldLabel htmlFor="yes" className="font-normal">
                    Yes
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="no" id="no" />
                  <FieldLabel htmlFor="no" className="font-normal">
                    No
                  </FieldLabel>
                </Field>
              </RadioGroup>
              {errors?.isOrthodoxJew && (
                <FieldDescription className="text-red-600">
                  {errors?.isOrthodoxJew?.msg}
                </FieldDescription>
              )}
            </FieldSet>

            <FieldSet>
              <FieldLabel>
                Are you married or have ever been married?
                <span className="text-red-600">*</span>
              </FieldLabel>
              <RadioGroup
                defaultValue="yes"
                value={form.maritalStatus}
                onValueChange={(value) =>
                  handleChange("maritalStatus", value)
                }
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="yes" id="yes" />
                  <FieldLabel htmlFor="yes" className="font-normal">
                    Yes
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="no" id="no" />
                  <FieldLabel htmlFor="no" className="font-normal">
                    No
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="other" id="other" />
                  <FieldLabel htmlFor="other" className="font-normal">
                    Other
                  </FieldLabel>
                </Field>
              </RadioGroup>
              {errors?.maritalStatus && (
                <FieldDescription className="text-red-600">
                  {errors?.maritalStatus?.msg}
                </FieldDescription>
              )}
            </FieldSet>

            <FieldSet>
              <FieldLabel>
                Do you keep Shabbos, Kashrus and Taharas Hamishpacha?
                <span className="text-red-600">*</span>
              </FieldLabel>
              <RadioGroup
                defaultValue="yes"
                value={form.keepsMitzvos}
                onValueChange={(value) =>
                  handleChange("keepsMitzvos", value)
                }
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="yes" id="yes" />
                  <FieldLabel htmlFor="yes" className="font-normal">
                    Yes
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="no" id="no" />
                  <FieldLabel htmlFor="no" className="font-normal">
                    No
                  </FieldLabel>
                </Field>
              </RadioGroup>
              {errors?.keepsMitzvos && (
                <FieldDescription className="text-red-600">
                  {errors?.keepsMitzvos?.msg}
                </FieldDescription>
              )}
            </FieldSet>

            <Field>
              <FieldDescription>
                To verify that you are our intended target audience,
                please answer the following questions
              </FieldDescription>
              <FieldLabel htmlFor="how-long">
                How long is the preparation (Chafifa) for mikvah on the
                day of mikvah supposed to take?
                <span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="how-long"
                type="text"
                placeholder=""
                value={form.chafifaDuration}
                onChange={(e) =>
                  handleChange(
                    "chafifaDuration",
                    e.target.value
                  )
                }
              />
              {errors?.chafifaDuration && (
                <FieldDescription className="text-red-600">
                  {errors?.chafifaDuration?.msg}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="feedback">
                If hot chicken soup spilled in your dairy sink, what
                would you do?
                <span className="text-red-600">*</span>
              </FieldLabel>
              <Textarea
                id="feedback"
                placeholder=""
                rows={4}
                value={form.chickenSoupInDairySink}
                onChange={(e) =>
                  handleChange(
                    "chickenSoupInDairySink",
                    e.target.value
                  )
                }
              />
              {errors?.chickenSoupInDairySink && (
                <FieldDescription className="text-red-600">
                  {errors?.chickenSoupInDairySink?.msg}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        <button
          type="submit"
          className="mt-5 w-full py-3 text-white font-medium text-lg rounded-lg 
          bg-gradient-to-r from-teal via-purple-500 to-pink-500 
          bg-[length:200%_200%] transition-all duration-500 hover:bg-right"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

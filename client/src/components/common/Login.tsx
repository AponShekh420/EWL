"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { addUserField, resetUserFields } from "@/redux/auth/loginFormSlice";
import type { RootState } from "@/redux/store";
import { BASE_URL } from "@/utils/envVariable";
import { createFormData } from "@/utils/createFormData";
import toast from "react-hot-toast";
import { setCredentials } from "@/redux/auth/userSlice";
import { Dispatch, SetStateAction, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

const Login = ({setAuthToggle}: {
  setAuthToggle?: Dispatch<SetStateAction<boolean | string>>;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, { msg: string }>>({});
  const router = useRouter();

  const dispatch = useDispatch();

  // 👇 using your existing store key
  const form = useSelector(
    (state: RootState) => state.loginFrom
  );

  const handleChange = (field: string, value: string) => {
    dispatch(addUserField({ [field]: value }));
  };


   const userLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = createFormData(form);
    try {
      setErrors({})
      setLoading(true)
      const res = await fetch(BASE_URL + "/api/auth/signin", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.success) {
        const {userInfo} = dataRes;
        dispatch(setCredentials(userInfo));
        dispatch(resetUserFields());
        toast.success(dataRes.msg)
        router.push("/");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setAuthToggle && setAuthToggle(false);
      } else {
        setErrors(dataRes?.errors)
      }
    } catch(err: unknown) {
      if (err instanceof Error) {
        console.log(err.message)
      }
    }
  }

  return (
    <div aria-disabled={loading} className={loading ? "opacity-50 pointer-events-none": ""}>
      <form className="w-ful mt-5" onSubmit={userLogin}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">
                Username or Email
                <span className="text-red-600">*</span>
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username or email"
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
              <FieldLabel htmlFor="password-toggle">
                Password<span className="text-red-600">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  className="bg-background"
                  id="password-toggle"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    handleChange("password", e.target.value)
                  }
                />
                <Button
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors?.password && (
                <FieldDescription className="text-red-600">
                  {errors?.password?.msg}
                </FieldDescription>
              )}
            </Field>
            
          </FieldGroup>
        </FieldSet>

        {errors?.failure && (
          <p className="text-red-600 mt-2 text-center">{errors?.failure?.msg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full py-3 text-white font-medium text-lg rounded-lg 
          bg-gradient-to-r from-teal via-purple-500 to-pink-500 
          bg-[length:200%_200%] transition-all duration-500 hover:bg-right flex justify-center items-center"
        >
          {loading ? <Icon icon="svg-spinners:wind-toy" width="28" height="28" /> : 'Login'}
        </button>
        <p className="mt-2 text-center mb0 mt10">
          Forgot your password?{' '}
          <Link
            className="text-red-600 underline hover:text-teal transition-all duration-300"
            href="/forgot-password"
            onClick={() => setAuthToggle && setAuthToggle(false)}
          >
            Reset it here.
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;

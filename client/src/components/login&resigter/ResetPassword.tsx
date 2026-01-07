"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { BASE_URL } from "@/utils/envVariable";
import { Icon } from "@iconify/react";
import { setCredentials } from "@/redux/auth/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";


interface resetPasswordErrorProps {
  password?: { msg?: string };
  failure?: { msg?: string };
  fail?: { msg?: string };
  confirmPassword?: { msg?: string };
}


const ResetPassword = ({token}: {token: string}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<resetPasswordErrorProps>({});

  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  const userPasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      setErrors({
          confirmPassword: {
            msg: "Passwords do not match. Please make sure both fields contain the same password."
          }
        });
      return;
    }

    try {
      setErrors({})
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/auth/reset-password/${token}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        const {userInfo} = dataRes;
        dispatch(setCredentials(userInfo))
        setPassword("");
        setConfirmPassword("");
        router.push("/");
        toast.success(dataRes.msg);
      } else {
        setErrors(dataRes?.errors);
        if(dataRes?.errors?.fail?.msg) {
          toast.error(dataRes.errors.fail.msg);
        }
      }
    } catch(err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.log(errorMessage);
    }
  }



  return (
    <form className={`w-full mt-5 ${loading ? "opacity-50 pointer-events-none": ""}`} onSubmit={userPasswordReset}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password-toggle">
              New Password
              <span className="text-red-600">*</span>
            </FieldLabel>
            <div className="relative">
              <Input
                className="bg-background"
                id="password-toggle"
                placeholder="Enter your new password"
                type={showPassword ? "text" : "password"}
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
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

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="cpassword-toggle">
              Confirm New Password
              <span className="text-red-600">*</span>
            </FieldLabel>
            <div className="relative">
              <Input
                className="bg-background"
                id="cpassword-toggle"
                type={showCPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                onChange={(e)=> setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <Button
                className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowCPassword(!showCPassword)}
                size="icon"
                type="button"
                variant="ghost"
              >
                {showCPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors?.confirmPassword && (
              <FieldDescription className="text-red-600">
                {errors?.confirmPassword?.msg}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      {errors?.failure && (
        <p className="text-red-600 mt-2 text-center">
          {errors?.failure?.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full py-3 text-white font-medium text-lg rounded-lg
        bg-gradient-to-r from-teal via-purple-500 to-pink-500
        bg-[length:200%_200%] transition-all duration-500 hover:bg-right
        flex justify-center items-center"
      >
        {loading ? (
          <Icon
            icon="svg-spinners:wind-toy"
            width="28"
            height="28"
          />
        ) : (
          "Reset Password"
        )}
      </button>
      <p className="mt-2 text-center mb0 mt10">
        Not signed up?{" "}
        <Link className="text-red-600 underline hover:text-teal transition-all duration-300" href="/register">
          Create an account.
        </Link>
      </p>
    </form>
  );
};

export default ResetPassword;

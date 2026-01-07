"use client"
import Link from "next/link";
import React, { useState } from "react";
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


interface ForgotPasswordErrorProps {
  email?: { msg?: string };
  failure?: { msg?: string };
  fail?: { msg?: string };
}

const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ForgotPasswordErrorProps>({});


  const userPasswordForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setErrors({})
      setLoading(true)
      const res = await fetch(BASE_URL + "/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email
        })
      })
      const dataRes = await res.json();
      setLoading(false)
      if(dataRes.msg) {
        setEmail("");
        setSuccess(true)
        toast.success(dataRes.msg);
      } else {
        setErrors(dataRes?.errors);
        if(dataRes?.errors?.fail?.msg) {
          toast.error(dataRes?.errors?.fail?.msg);
        }
      }
    } catch(err) {
      console.log((err as Error)?.message);
    }
  }



  return (
    <>
      {success ? (
        <h5 className="py-[150px] text-center">
          If an account with that email or username exists, you will
          receive an email with instructions to reset your password.
          Please check your inbox and spam folder.
        </h5>
      ) : (
        <form className={`w-full mt-5 ${loading ? "opacity-50 pointer-events-none": ""}`} onSubmit={userPasswordForgot} action={BASE_URL + "/api/auth/forgot-password"} method="POST">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">
                  Username or Email
                  <span className="text-red-600">*</span>
                </FieldLabel>

                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors?.email && (
                  <FieldDescription className="text-red-600">
                    {errors?.email?.msg}
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
              "Send Reset Link"
            )}
          </button>
            <p className="mt-2 text-center mb0 mt10">
              Not signed up?{" "}
              <Link className="text-red-600 underline hover:text-teal transition-all duration-300" href="/register">
                Create an account.
              </Link>
            </p>
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
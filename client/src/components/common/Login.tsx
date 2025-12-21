"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { addUserField } from "@/redux/auth/loginFormSlice";
import type { RootState } from "@/redux/store";

const Login = () => {
  const dispatch = useDispatch();

  // 👇 using your existing store key
  const form = useSelector(
    (state: RootState) => state.loginFrom
  );

  const handleChange = (field: string, value: string) => {
    dispatch(addUserField({ [field]: value }));
  };

  return (
    <div>
      <div className="w-ful mt-5">
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
              {/* <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription> */}
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
              {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
            </Field>
          </FieldGroup>
        </FieldSet>

        <button
          className="mt-5 w-full py-3 text-white font-medium text-lg rounded-lg 
          bg-gradient-to-r from-teal via-purple-500 to-pink-500 
          bg-[length:200%_200%] transition-all duration-500 hover:bg-right"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

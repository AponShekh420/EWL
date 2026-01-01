import { Label } from "@/components/ui/label";
import { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "../ui/input";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  icon?: ReactNode;
  className?: string;
  parentClassName?: string;
  error?: string;
}

export default function InputBox({
  parentClassName,
  className,
  name,
  label,
  icon,
  type,
  error,
  ...rest
}: InputBoxProps) {
  if (type == "number") {
    return (
      <div className={parentClassName}>
        <Label htmlFor={name} className="capitalize mb-4">
          {label}
        </Label>
        <div className="relative">
          <span
            className={`${
              icon ? "block" : "hidden"
            } absolute top-1/2 left-4 -translate-y-1/2 `}
          >
            $
          </span>
          <Input
            type={type || "text"}
            id={name}
            className={` py-5  block w-full ${icon && "pl-10"} ${className}`}
            name={name}
            {...rest}
          />
          {error && (
            <span className="text-red-500 text-xs mt-2 ml-1">{error}</span>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={parentClassName}>
      <Label htmlFor={name} className="capitalize mb-4">
        {label}
      </Label>
      <Input
        type={type || "text"}
        id={name}
        className={`py-5 ${className}`}
        name={name}
        {...rest}
      />
      {error && <span className="text-red-500 text-xs mt-2 ml-1">{error}</span>}
    </div>
  );
}

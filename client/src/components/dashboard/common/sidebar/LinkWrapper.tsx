import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export default function LinkWrapper({
  children,
  isDropDown,
  className,
  ...rest
}: {
  children: ReactNode;
  isDropDown: boolean;
  className: string;
} & LinkProps) {
  if (isDropDown) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Link className={className} {...rest}>
      {children}
    </Link>
  );
}

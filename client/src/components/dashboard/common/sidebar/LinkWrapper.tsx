import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type LinkWrapperProps = {
  children: ReactNode;
  isDropDown: boolean;
  className?: string;
} & (LinkProps & React.HTMLAttributes<HTMLDivElement>);

export default function LinkWrapper({
  children,
  isDropDown,
  className,
  href,
}: LinkWrapperProps & { children: ReactNode }) {
  if (isDropDown) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export default function PageHeading({
  children,
  pageTitle,
  breadcrumbList,
}: {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumbList: { name: string; href: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-2 ">
      <div>
        <h1 className="font-bold text-xl mb-3">{pageTitle}</h1>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbList.map((breadcrumb, index) => (
              <Fragment key={index}>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={`/dashboard${breadcrumb.href}`}>
                    {breadcrumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== breadcrumbList.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="space-x-4">{children}</div>
    </div>
  );
}

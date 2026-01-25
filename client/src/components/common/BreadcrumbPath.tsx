import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export default function BreadcrumbPath({
  breadcrumbList,
}: {
  breadcrumbList: { name: string; href: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbList.map((breadcrumb, index) => (
          <Fragment key={index}>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                className={
                  index === breadcrumbList.length - 1 ? "text-teal" : ""
                }
                href={`${breadcrumb.href}`}
              >
                {breadcrumb.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbList.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

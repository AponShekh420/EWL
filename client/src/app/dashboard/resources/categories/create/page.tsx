import PageHeading from "@/components/dashboard/common/PageHeading";
import ResoucesCategoryForm from "@/components/dashboard/resources/category/ResourceCategoryForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateBlogCategory() {
  return (
    <div>
      <PageHeading
        pageTitle="Create Resources Category"
        breadcrumbList={[
          { name: "Resources", href: "/resources" },
          { name: "Categories", href: "/Resources/categories" },
          {
            name: "Create",
            href: "/resources/categories/create",
          },
        ]}
      >
        <Link href="/dashboard/resources/categories">
          <Button variant="blue">
            <span>See Resouces Categories</span>
          </Button>
        </Link>
      </PageHeading>
      <ResoucesCategoryForm />
    </div>
  );
}

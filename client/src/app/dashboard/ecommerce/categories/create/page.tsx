import PageHeading from "@/components/dashboard/common/PageHeading";
import CategoryForm from "@/components/dashboard/ecommerce/category/CategoryForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateCategory() {
  return (
    <div>
      <PageHeading
        pageTitle="Create Category"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Categories", href: "/ecommerce/categories" },
          { name: "Create", href: "/ecommerce/categories/create" },
        ]}
      >
        <Link href="/dashboard/ecommerce/categories">
          <Button variant="blue">
            <span>See Categories</span>
          </Button>
        </Link>
      </PageHeading>
      <CategoryForm />
    </div>
  );
}

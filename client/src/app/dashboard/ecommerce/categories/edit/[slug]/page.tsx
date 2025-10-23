import PageHeading from "@/components/dashboard/common/PageHeading";
import CategoryForm from "@/components/dashboard/ecommerce/category/CategoryForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditCategory({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return (
    <div>
      <PageHeading
        pageTitle="Edit Category"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Categories", href: "/ecommerce/categories" },
          {
            name: "Edit",
            href: `/ecommerce/categories/edit/${slug}`,
          },
        ]}
      >
        <Link href="/dashboard/ecommerce/categories">
          <Button variant="blue">
            <span>See categories</span>
          </Button>
        </Link>
      </PageHeading>
      <CategoryForm />
    </div>
  );
}

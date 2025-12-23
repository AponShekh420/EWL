import PageHeading from "@/components/dashboard/common/PageHeading";
import CategoryForm from "@/components/dashboard/ecommerce/category/CategoryForm";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import Link from "next/link";

export default async function EditCategory({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const res = await fetch(BASE_URL + "/api/ecommerce/categories/" + slug);
  const { data: category } = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }
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
          {
            name: slug,
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
      <CategoryForm category={category} />
    </div>
  );
}

import { getResourcesCategoryBySlug } from "@/actions/resourcesCategory";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ResoucesCategoryForm from "@/components/dashboard/resources/category/ResourceCategoryForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditBlogCategory({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data: category } = await getResourcesCategoryBySlug(slug);

  return (
    <div>
      <PageHeading
        pageTitle="Edit Resources Category"
        breadcrumbList={[
          { name: "Resources", href: "/resources" },
          { name: "Categories", href: "/resources/categories" },
          {
            name: "Edit",
            href: `/resources/categories/edit/${slug}`,
          },
          {
            name: slug,
            href: `/resources/categories/edit/${slug}`,
          },
        ]}
      >
        <Link href="/dashboard/resources/categories">
          <Button variant="blue">
            <span>See Resources Categories</span>
          </Button>
        </Link>
      </PageHeading>
      <ResoucesCategoryForm category={category} />
    </div>
  );
}

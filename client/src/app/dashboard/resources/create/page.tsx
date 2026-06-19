import { getResourcesCategories } from "@/actions/resourcesCategory";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ResourcesForm from "@/components/dashboard/resources/ResoucesForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CreateResources() {
  const { data: categoriesData } = await getResourcesCategories();
  const categories = categoriesData?.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    }),
  );
  return (
    <div>
      <PageHeading
        pageTitle="Create Resources"
        breadcrumbList={[
          { name: "Resources", href: "/resources" },

          { name: "Create", href: "/resources/create" },
        ]}
      >
        <Link href="/dashboard/resources">
          <Button variant="blue">
            <span>See Resources</span>
          </Button>
        </Link>
      </PageHeading>
      <ResourcesForm categories={categories} />
    </div>
  );
}

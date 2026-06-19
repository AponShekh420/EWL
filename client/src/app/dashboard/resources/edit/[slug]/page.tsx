import { getResourcesBySlug } from "@/actions/resources";
import { getResourcesCategories } from "@/actions/resourcesCategory";
import PageHeading from "@/components/dashboard/common/PageHeading";
import ResourcesForm from "@/components/dashboard/resources/ResoucesForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditResource({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const [resourcesData, categoriesData] = await Promise.all([
    getResourcesBySlug(slug),
    getResourcesCategories(),
  ]);
  const categories = categoriesData.data.map(
    (category: { name: string; slug: string }) => ({
      label: category.name,
      value: category.slug,
    }),
  );
  return (
    <div>
      <PageHeading
        pageTitle="Edit Blog"
        breadcrumbList={[
          { name: "Resources", href: "/resources" },
          {
            name: `Edit`,
            href: `/resources/edit/${slug}`,
          },
          {
            name: `${slug}`,
            href: `/resouces/edit/${slug}`,
          },
        ]}
      >
        <Link href="/dashboard/resources">
          <Button variant="blue">
            <span>See Resources</span>
          </Button>
        </Link>
      </PageHeading>

      <ResourcesForm
        resourcesData={resourcesData?.data}
        categories={categories}
      />
    </div>
  );
}

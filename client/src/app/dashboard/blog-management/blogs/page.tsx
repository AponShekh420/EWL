import { getBlogByQuery } from "@/actions/blog";
import PageHeading from "@/components/dashboard/common/PageHeading";
import BlogTable from "@/components/dashboard/common/tables/BlogTable";
import { Button } from "@/components/ui/button";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function Blogs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = await queryFormatter(searchParams);
  const { data: blogsData, pagination } = await getBlogByQuery(query);

  return (
    <div>
      <PageHeading
        pageTitle="Blogs"
        breadcrumbList={[
          { name: "Blog Management", href: "/blog-management" },
          { name: "Blog List", href: "/blog-management/blogs" },
        ]}
      >
        <Button variant="outline">
          <Icon icon="charm:upload" width="32" height="32" />
          <span>Export</span>
        </Button>
        <Link href="/dashboard/blog-management/blogs/create">
          <Button variant="blue">
            <Icon icon="ic:baseline-plus" width="32" height="32" />
            <span>Add Blog</span>
          </Button>
        </Link>
      </PageHeading>
      {blogsData && (
        <BlogTable blogs={blogsData} pagination={pagination} />
      )}
    </div>
  );
}

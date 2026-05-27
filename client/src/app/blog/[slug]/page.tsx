import { getBlogBySlug } from "@/actions/blog";
import { getSession } from "@/lib/authLib";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }
  const { slug } = await params;
  const { data: blog } = await getBlogBySlug(slug);

  return (
    <main className="container min-h-screen">
      <div>
        <h1 className="text-4xl font-bold mt-10 mb-6">{blog.title}</h1>
        <Image
          src={getImageUrl(blog.thumbnail, "blogs")}
          alt={blog.title}
          width={1200}
          height={800}
          priority
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="prose max-w-none mt-10" dangerouslySetInnerHTML={{ __html: blog.description }} />
    </main>
  );
}

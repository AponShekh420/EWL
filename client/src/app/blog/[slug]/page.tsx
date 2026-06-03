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
    <main className="container min-h-screen max-w-[700px] mb-6">
      <div>
        <h1 className="ql-font-playfair md:text-[44px] sm:text-4xl text-3xl font-semibold leading-tight mt-10">{blog.title}</h1>
        {blog?.subtitle && <p className="ql-font-cormorant text-[22px] font-semibold text-gray-500 mt-[30px] mb-[30px]">{blog.subtitle}</p>}
        <Image
          src={getImageUrl(blog.thumbnail, "blogs")}
          alt={blog.title}
          width={1200}
          height={800}
          priority
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div
        className="
          quillEditorTextHandler
          prose 
          max-w-none 
          mt-10

          prose-p:my-2
          prose-p:leading-normal

          prose-li:my-1
          prose-ul:my-2
          prose-ol:my-2

          prose-headings:my-3

          prose-img:my-3
        "
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </main>
  );
}

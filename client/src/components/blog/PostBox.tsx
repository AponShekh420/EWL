import {
  Card,
  CardDescription,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BlogType } from "@/types/Blog"
import { getImageUrl } from "@/utils/getImageUrl"
import { Icon } from "@iconify/react"
import Image from "next/image"

export function PostBox({blog}: {blog: BlogType}) {
  const plainTextDescription = blog.description
  ?.replace(/<[^>]*>/g, "") // Remove HTML tags
  ?.slice(0, 100); // Limit to 100 characters
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video" />
      <Image
        src={getImageUrl(blog.thumbnail, "blogs")}
        alt={blog.title}
        className="relative z-20 aspect-video w-full object-cover object-center"
        width={500}
        height={300}
      />
      <CardHeader className="px-3 py-0">
        <p className="my-0 py-0 text-violet-cs text-[14px]">{blog.category}</p>
        <CardTitle className="leading-normal font-semibold">{blog.title}</CardTitle>
        <CardDescription>
          {plainTextDescription}
          {plainTextDescription?.length === 100 ? "..." : ""}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-wrap gap-2 px-3 py-0">
        <p className="text-violet-cs hover:text-[#270034] flex items-center gap-2 text-sm">Read Article 
          <Icon
            icon="maki:arrow"
            width="16"
            height="16"
          />
        </p>
      </CardFooter>
    </Card>
  )
}

import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BlogType } from "@/types/Blog"
import { getImageUrl } from "@/utils/getImageUrl"
import Image from "next/image"

export function PostBox({blog}: {blog: BlogType}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video" />
      <Image
        src={getImageUrl(blog.thumbnail, "blogs")}
        alt={blog.title}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        width={500}
        height={300}
      />
      <CardHeader className="px-3 py-0">
        <CardAction>
        </CardAction>
        <CardTitle>{blog.title}</CardTitle>
        {/* <CardDescription>
          {blog.description}
        </CardDescription> */}
      </CardHeader>
      <CardFooter className="flex-wrap gap-2 px-3 py-0">
        {blog?.tags?.map((tag: string) => (
          <Badge key={tag} variant="outline" className="capitalize">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}

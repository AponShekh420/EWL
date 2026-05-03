import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Records from "@/components/class-private/Records";
import { getPrivateRecords } from "@/actions/getPrivateRecords";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/authLib";



export default async function page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }

  const {slug} = await params;
  let records;
  try {
    const { data } = await getPrivateRecords("course-demo", slug);
    if(!data || data.length == 0) {
        return redirect(`/course/${slug}`)
    }
    records = data
  } catch (err) {
      return redirect(`/course/${slug}`)
  }
  return (
    <div className="min-h-screen bg-[#1f6fa5] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-white mb-8">
          {records[0]?.course?.speaker?.firstName + " " + records[0]?.course?.speaker?.lastName}
        </h1>

        <Card className="rounded-2xl shadow-xl bg-[#2a7db5] border-none">
          <CardContent className="flex md:flex-row flex-col gap-10">

            {/* Audio and video Section */}
            <div className="w-full md:border-r-1 md:border-gray-300 border-r-none">
              <Records recording={records} classes="bg-none px-6"/>
            </div>

            {/* Image Section */}
            <div className="flex flex-col items-center gap-6">

              <div className="relative md:w-[250px] w-full aspect-[16/10] overflow-hidden rounded-lg">
                <Image
                    src="/images/courses/course.jpg"
                    alt="Course Thumbnail"
                    fill
                    className="object-cover"
                />
              </div>
              <Link href={`/course/${slug}`}>
                <Button className="bg-[#270033] hover:bg-purple-800 rounded-full px-8">
                  More Info
                </Button>
              </Link>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}
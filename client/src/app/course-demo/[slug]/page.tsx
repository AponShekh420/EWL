import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Records from "@/components/class-private/Records";

interface recordedProps {
    id: number;
    type: "audio" | "video";
    url: string;
}


const ClassRecording: recordedProps[] = [
    {
        id: 1,
        type: "audio",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: 3,
        type: "video",
        url: "https://www.w3schools.com/html/movie.mp4"
    }
]

export default function page() {
  return (
    <div className="min-h-screen bg-[#1f6fa5] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-white mb-8">
          Rabbi Yehoshua Berman
        </h1>

        <Card className="rounded-2xl shadow-xl bg-[#2a7db5] border-none">
          <CardContent className="flex md:flex-row flex-col gap-10">

            {/* Audio and video Section */}
            <div className="w-full md:border-r-1 md:border-gray-300 border-r-none">
              <Records title="Class Recordings" recording={ClassRecording} classes="bg-none px-6"/>
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

              <Button className="bg-[#270033] hover:bg-purple-800 rounded-full px-8">
                More Info
              </Button>

            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}
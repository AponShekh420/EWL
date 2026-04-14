import PrivateSidebar from "@/components/class-private/PrivateSidebar";
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

const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
    <div className="min-h-screen">
        <div className="lg:flex">
        <div className={`lg:w-64 2xl:w-72`}>
            <PrivateSidebar />
        </div>
        <div className="lg:flex-1  mt-4 lg:mt-0">
            <div className="px-8"><Records title="class 1" recording={ClassRecording} classes="bg-teal p-6"/></div>
        </div>
        </div>
    </div>
    );
}

export default page;
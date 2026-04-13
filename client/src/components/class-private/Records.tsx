"use client";
// import { Icon } from "@iconify/react";
import AudioPlayer from "../common/AudioPlayer";
import { getImageUrl } from "@/utils/getImageUrl";
import VideoPlayer from "../common/VideoPlayer";

const addedClasses = [
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


const Records = () => {
    return (
        <div className="w-full grid gap-4 mt-10 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
            {[1, 2, 3].map((record) => (
                <div className="bg-teal rounded-2xl p-6 space-y-6" key={record}>
                    <h4 className='text-center bg-[#270034] px-4 py-2 w-fit mx-auto rounded-md text-white'>Apon shekh</h4>
                    {addedClasses.map((item) => (
                        <div key={item.id}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-white">Class {item.id}</span>
                        </div>
                        {/* <CustomPlayer url={item.url} type={item.type} /> */}
                        {item.type === "audio" ? (
                            <div className='bg-black p-2'>
                                <AudioPlayer url={getImageUrl(item.url, "classes")}/>
                            </div>
                        ) : (
                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                            <VideoPlayer url={getImageUrl(item.url, "classes")} />
                        </div>
                        )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Records;
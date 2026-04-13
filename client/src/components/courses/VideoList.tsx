"use client"
import { getImageUrl } from "@/utils/getImageUrl";
import VideoPlayer from "../common/VideoPlayer";

const VideoList = ({ videos }: { videos: string[] }) => {
    return (
        <>
        {videos.length > 0 && videos.map((video: string, index: number) => (
          <div key={index + Date.now()} className="relative w-fit">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <VideoPlayer url={getImageUrl(video, "classes")} />
            </div>
          </div>
        ))}
        </>
    );
}

export default VideoList;
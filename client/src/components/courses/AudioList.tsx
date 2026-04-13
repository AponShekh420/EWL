"use client"
import { getImageUrl } from "@/utils/getImageUrl";
import AudioPlayer from "../common/AudioPlayer";

const AudioList = ({ audios }: { audios: string[] }) => {
    return (
        <>
        {audios.length > 0 && audios.map((audio: string, index: number) => (
          <div key={index + Date.now()} className="relative w-full h-full">
            <div className='bg-black p-2'>
              <AudioPlayer url={getImageUrl(audio, "classes")}/>
            </div>
          </div>
        ))}
        </>
    );
}

export default AudioList;
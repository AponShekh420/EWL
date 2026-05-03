"use client";

import AudioPlayer from "../common/AudioPlayer";
import { getImageUrl } from "@/utils/getImageUrl";
import VideoPlayer from "../common/VideoPlayer";
import { IDisplayRecording } from "@/types/Recording";

type RecordsProps = {
  recording: IDisplayRecording[];
  classes?: string;
};

const Records = ({ recording, classes }: RecordsProps) => {
  return (
    <div className="w-full grid gap-4 mt-10 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
      {recording?.map((record, recordIndex) => (
        <div className={`rounded-2xl space-y-6 ${classes || ""}`} key={recordIndex}>
          <h4 className="text-center bg-[#270034] px-4 py-2 w-fit mx-auto rounded-md text-white capitalize">
              {record.recordingCategory === "free"
                ? typeof record?.speaker === "object" && record?.speaker !== null
                  ? `${record.speaker.firstName}  ${record.speaker.lastName}`
                  : record?.speaker
                : record.heading}
          </h4>

          {record.recordings
            .slice() // makes a copy so original array isn't mutated
            .sort((a, b) => a.recordNumber - b.recordNumber)
            .map((item, itemIndex) => (
                <div key={itemIndex}>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white">
                    Part {item.recordNumber}
                    </span>
                </div>

                {(() => {
                    const url = item.sourceType === "internal"
                        ? (typeof item?.file === "string" ? getImageUrl(item.file, "recording") : undefined)
                        : item.externalLink;

                    return url ? (
                        item.mediaType === "audio" ? (
                        <div className="bg-black p-2">
                            <AudioPlayer recordNumber={item.recordNumber} url={url} />
                        </div>
                        ) : (
                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                            <VideoPlayer recordNumber={item.recordNumber} url={url} />
                        </div>
                        )
                    ) : null;
                })()}
                </div>
            ))}
        </div>
      ))}
    </div>
  );
};


export default Records;
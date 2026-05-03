"use client";

import dynamic from "next/dynamic";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
} from "media-chrome/react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


export default function AudioPlayer({ url, recordNumber }: { url: string, recordNumber?: number }) {
  return (
    <MediaController
      style={{
        width: "100%",
        height: "50px",
      }}
    >
      <ReactPlayer
        tabIndex={recordNumber ? (recordNumber + 1000) : Date.now()}
        slot="media"
        src={url}
        controls={false}
        style={{
          width: "100%",
          height: "50px",
          "--controls": "none",
        } as React.CSSProperties}
      ></ReactPlayer>
      <MediaControlBar>
        <MediaPlayButton />
        <MediaSeekBackwardButton seekOffset={10} />
        <MediaSeekForwardButton seekOffset={10} />
        <MediaTimeRange />
        <MediaTimeDisplay showDuration />
        <MediaMuteButton />
        <MediaVolumeRange />
        <MediaPlaybackRateButton />
      </MediaControlBar>
    </MediaController>
  );
}
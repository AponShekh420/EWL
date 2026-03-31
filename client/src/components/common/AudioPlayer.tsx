import ReactPlayer from "react-player";
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

export default function AudioPlayer({ url }: { url: string }) {
  return (
    <MediaController
      style={{
        width: "100%",
      }}
    >
      <ReactPlayer
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
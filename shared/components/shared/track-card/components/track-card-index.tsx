import React, { FC } from "react";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { Volume2 } from "lucide-react";

interface Props {
  trackId: string;
  index: number;
}

export const TrackCardIndex: FC<Props> = ({ trackId, index }) => {
  const playingTrackId = useCurrentPlayingTrack((state) => state.track?.id);

  return (
    <>
      {playingTrackId === trackId ? (
        <Volume2 className="text-accent" size={24} />
      ) : (
        index + 1
      )}
    </>
  );
};

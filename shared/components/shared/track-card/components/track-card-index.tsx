import React, { FC } from "react";
import { usePlaybar } from "@/shared/store/playbar";
import { Volume2 } from "lucide-react";

interface Props {
  trackId: string;
  index: number;
}

export const TrackCardIndex: FC<Props> = ({ trackId, index }) => {
  const playingTrackId = usePlaybar((state) => state.track?.id);

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

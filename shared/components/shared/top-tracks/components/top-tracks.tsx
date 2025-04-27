"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { useTopTracks } from "../hooks";
import { TopTrackSkeleton } from "./top-track-skeleton";
import { useShallow } from "zustand/shallow";
import * as TrackCard from "@/shared/components/shared/track-card";

interface Props {
  className?: string;
}

export const TopTracks: FC<Props> = ({ className }) => {
  const { tracks, isLoading } = useTopTracks();
  const [playingTrack, setTrack] = useCurrentPlayingTrack(
    useShallow((state) => [state.track, state.setTrack]),
  );

  const skeletons = new Array(7)
    .fill(0)
    .map((_, index) => <TopTrackSkeleton key={index} />);

  return (
    <div className={cn("flex-1", className)}>
      <h3 className="text-2xl font-semibold text-black">
        Top Of The Week Hits
      </h3>
      <table className="mt-4 w-full">
        <thead className="border-y-[1px] border-gray-200 text-left text-sm uppercase">
          <tr className="tracking-widest text-stone-400">
            <th className="py-1">№</th>
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody className="truncate text-base text-gray-600">
          {!isLoading &&
            tracks.length > 0 &&
            tracks.slice(0, 7).map((track, index) => (
              <tr
                key={track.id}
                className={cn(
                  "border-gray-200 font-semibold not-last:border-b-[1px]",
                )}
              >
                <td
                  onClick={() => setTrack(track)}
                  className="hover:text-accent cursor-pointer py-[7.5px] pr-4 text-neutral-500 duration-200"
                  title="Play track"
                >
                  <TrackCard.Index trackId={track.id} index={index} />
                </td>
                <td
                  onClick={() => setTrack(track)}
                  className={`hover:text-accent max-w-[250px] cursor-pointer truncate pr-12 duration-200 ${playingTrack?.id === track.id && "text-accent"}`}
                  title="Play track"
                >
                  <TrackCard.Title title={track.title} className="truncate" />
                </td>
                <td className="hover:text-accent cursor-pointer duration-200">
                  <TrackCard.Artist
                    href={`users/${track.user.id}`}
                    name={track.user.name}
                  />
                </td>
              </tr>
            ))}
          {isLoading && skeletons}
        </tbody>
      </table>
    </div>
  );
};

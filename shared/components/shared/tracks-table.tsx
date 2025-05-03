"use client";

import React, { FC, Fragment, useMemo, useState } from "react";
import { cn } from "@/shared/lib/utils";
import {
  ButtonLikeTrack,
  PlaylistPageTrackSkeleton,
  SortArrow,
} from "@/shared/components/shared";
import * as TrackCard from "@/shared/components/shared/track-card";
import { useShallow } from "zustand/shallow";
import { usePlaybar } from "@/shared/store/playbar";
import { formatTrackTime } from "@/shared/lib";
import { TrackWithIndexes } from "./playlist-page/hooks/use-playlist-page-tracks";

interface Props {
  tracks: TrackWithIndexes[];
  trackCount?: number;
  canLoadMore?: boolean;
  setTracks?: (tracks: TrackWithIndexes[]) => void;
  isLoading?: boolean;
  className?: string;
}

export const TracksTable: FC<Props> = ({
  tracks,
  trackCount,
  setTracks,
  isLoading,
  canLoadMore,
  className,
}) => {
  const [playingTrack, setTrack] = usePlaybar(
    useShallow((state) => [state.track, state.setTrack]),
  );
  const [sortConfig, setSortConfig] = useState({
    index: null,
    play_count: null,
    duration: null,
  });

  const skeletons = useMemo(
    () =>
      new Array(10)
        .fill(0)
        .map((_, index) => <PlaylistPageTrackSkeleton key={index} />),
    [],
  );

  const sortByColumn = (column: keyof typeof sortConfig) => {
    setSortConfig((prev) => {
      const cleared = Object.fromEntries(
        Object.keys(prev).map((key) => [key, null]),
      );

      return {
        ...cleared,
        [column]: prev[column] === "asc" ? "desc" : "asc",
      } as unknown as typeof prev;
    });

    const sorted = tracks.toSorted((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig[column] === null || sortConfig[column] === "desc"
          ? valA - valB
          : valB - valA;
      } else {
        return 0;
      }
    });

    setTracks?.(sorted);
  };

  if (trackCount === 0) {
    return <div className="col-span-6">No tracks found</div>;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_max-content_1fr__auto_auto_auto] items-center gap-6 overflow-x-auto",
        className,
      )}
    >
      <div
        onClick={() => sortByColumn("index")}
        className={`user-select-none hover:text-accent flex cursor-pointer items-center gap-1 font-bold transition-colors duration-200 ${
          sortConfig.index ? "text-accent" : "text-gray-700"
        }`}
      >
        #
        <SortArrow direction={sortConfig.index} />
      </div>

      <div className="font-bold text-gray-700">Title</div>
      <div className="font-bold text-gray-700">Genre</div>
      <div className="font-bold text-gray-700">Like</div>

      <div
        onClick={() => sortByColumn("play_count")}
        className={`hover:text-accent user-select-none flex cursor-pointer items-center gap-1 font-bold transition-colors duration-200 ${
          sortConfig.play_count ? "text-accent" : "text-gray-700"
        }`}
      >
        Play count
        <SortArrow direction={sortConfig.play_count} />
      </div>

      <div
        onClick={() => sortByColumn("duration")}
        className={`hover:text-accent user-select-none flex cursor-pointer items-center gap-1 font-bold transition-colors duration-200 ${
          sortConfig.duration ? "text-accent" : "text-gray-700"
        }`}
      >
        Duration
        <SortArrow direction={sortConfig.duration} />
      </div>

      {tracks.length > 0 &&
        tracks.map((track, i) => (
          <Fragment key={`${track.index || i}-${track.id}`}>
            <div
              onClick={() => setTrack(track, tracks)}
              title="Play Track"
              className={cn(
                "hover:text-accent cursor-pointer text-gray-500 transition duration-200",
                { "text-accent": playingTrack?.id === track.id },
              )}
            >
              <TrackCard.Index trackId={track.id} index={track.index || i} />
            </div>
            <div
              onClick={() => setTrack(track, tracks)}
              className="flex cursor-pointer gap-2"
            >
              <TrackCard.Image
                imageUrl={track.artwork["150x150"]}
                width={50}
                height={50}
                className="shrink-0"
              />
              <div>
                <TrackCard.Title
                  className={`hover:text-accent transition-colors duration-200 max-xl:max-w-[250px] max-xl:truncate max-lg:max-w-[180px] ${playingTrack?.id === track.id && "text-accent"}`}
                  title={track.title}
                />
                <TrackCard.Artist
                  name={track.user.name}
                  onClick={(event) => event.stopPropagation()}
                  href={`/users/${track.user.id}`}
                />
              </div>
            </div>
            <TrackCard.Genre
              onClick={() => setTrack(track, tracks)}
              genre={track.genre}
              className="cursor-pointer text-gray-500"
            />
            <ButtonLikeTrack track={track} />
            <div>{track.play_count}</div>
            <div className="text-gray-500">
              {formatTrackTime(track.duration)}
            </div>
          </Fragment>
        ))}
      {isLoading && tracks.length > 0 && canLoadMore && skeletons}
      {isLoading && tracks.length === 0 && skeletons}
    </div>
  );
};

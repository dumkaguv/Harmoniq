"use client";

import React, { FC, Fragment } from "react";
import { cn, formatTrackTime } from "@/shared/lib";
import { Playlist } from "@/types/audius";
import { usePlaybar } from "@/shared/store/playbar";
import { usePlaylistPageTracks } from "../hooks";
import { PlaylistPageTrackSkeleton } from "./";
import { useShallow } from "zustand/shallow";
import { ButtonLikeTrack } from "@/shared/components/shared";
import * as TrackCard from "@/shared/components/shared/track-card";

interface Props {
  playlist: Playlist;
  className?: string;
}

export const PlaylistPageTracks: FC<Props> = ({ playlist, className }) => {
  const [playingTrack, setTrack] = usePlaybar(
    useShallow((state) => [state.track, state.setTrack]),
  );
  const { isLoading, tracks } = usePlaylistPageTracks(playlist.id);

  const skeletons = new Array(7)
    .fill(0)
    .map((_, index) => <PlaylistPageTrackSkeleton key={index} />);

  return (
    <div
      className={cn(
        "mt-10 grid grid-cols-[auto_max-content_1fr__auto_auto_auto] items-center gap-6",
        className,
      )}
    >
      <div className="font-bold text-gray-700">#</div>
      <div className="font-bold text-gray-700">Title</div>
      <div className="font-bold text-gray-700">Genre</div>
      <div className="font-bold text-gray-700">Like</div>
      <div className="flex items-center gap-2 font-bold text-gray-700">
        Play count
      </div>
      <div className="font-bold text-gray-700">Duration</div>
      {!isLoading &&
        tracks.length > 0 &&
        tracks.map((track, index) => (
          <Fragment key={`${index}-${track.id}`}>
            <div
              onClick={() => setTrack(track, tracks)}
              title="Play Track"
              className={cn(
                "hover:text-accent cursor-pointer text-gray-500 transition duration-200",
                { "text-accent": playingTrack?.id === track.id },
              )}
            >
              <TrackCard.Index trackId={track.id} index={index} />
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
                  className={`hover:text-accent transition-colors duration-200 ${playingTrack?.id === track.id && "text-accent"}`}
                  title={track.title}
                />
                <TrackCard.Artist
                  name={track.user.name}
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
      {isLoading && skeletons}
    </div>
  );
};

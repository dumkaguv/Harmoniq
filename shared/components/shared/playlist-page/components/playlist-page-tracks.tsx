"use client";

import React, { FC, Fragment } from "react";
import { cn, formatTime } from "@/shared/lib/utils";
import { Playlist } from "@/types/audius";
import { Volume2 } from "lucide-react";
import { useCurrentPlayingTrack } from "@/shared/store/currentPlayingTrack";
import { usePlaylistPageTracks } from "../hooks";
import { PlaylistPageTrackSkeleton } from "./";
import { useShallow } from "zustand/shallow";
import Link from "next/link";
import { ButtonLikeTrack } from "@/shared/components/shared";

interface Props {
  playlist: Playlist;
  className?: string;
}

export const PlaylistPageTracks: FC<Props> = ({ playlist, className }) => {
  const [playingTrack, setTrack] = useCurrentPlayingTrack(
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
              onClick={() => setTrack(track)}
              title="Play Track"
              className={cn(
                "hover:text-accent cursor-pointer text-gray-500 transition duration-200",
                { "text-accent": playingTrack?.id === track.id },
              )}
            >
              {playingTrack?.id === track.id ? (
                <Volume2 className="text-accent" size={24} />
              ) : (
                index + 1
              )}
            </div>
            <div
              onClick={() => setTrack(track)}
              className="flex cursor-pointer flex-col gap-1"
            >
              <span
                className={`hover:text-accent transition-colors duration-200 ${playingTrack?.id === track.id && "text-accent"}`}
                title="Play Track"
              >
                {track.title}
              </span>
              <Link
                href=""
                className="hover:text-accent text-gray-500 transition-colors duration-200"
              >
                {track.user.name}
              </Link>
            </div>
            <div
              onClick={() => setTrack(track)}
              className="cursor-pointer text-gray-500"
            >
              {track.genre}
            </div>
            <ButtonLikeTrack track={track} />
            <div>{track.play_count}</div>
            <div className="text-gray-500">{formatTime(track.duration)}</div>
          </Fragment>
        ))}
      {isLoading && skeletons}
    </div>
  );
};

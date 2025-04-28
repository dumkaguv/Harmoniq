"use client";

import React, { FC, useRef } from "react";
import * as TrackCard from "@/shared/components/shared/track-card";
import { cn, formatTrackTime } from "@/shared/lib";
import {
  ButtonLikeTrack,
  PlaybarButtonRepeat,
  PlaybarButtonVolume,
  PlaybarProgressBar,
  PlaybarButtonPlayPause,
  PlaybarButtonNextTrack,
  PlaybarButtonPrevTrack,
  PlaybarButtonShuffle,
} from "@/shared/components/shared";
import { usePlaybar } from "../hooks";

interface Props {
  className?: string;
}

const PLAYBAR_BUTTONS = [
  {
    name: "Previous Track",
    component: <PlaybarButtonPrevTrack />,
  },
  {
    name: "Play/Pause",
    component: <PlaybarButtonPlayPause />,
  },
  {
    name: "Next Track",
    component: <PlaybarButtonNextTrack />,
  },
  {
    name: "Shuffle",
    component: <PlaybarButtonShuffle />,
  },
  {
    name: "Repeat",
    component: <PlaybarButtonRepeat />,
  },
];

export const Playbar: FC<Props> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playbarRef = useRef<HTMLDivElement>(null);
  const { track, audioSrc, trackDuration, currentTime, isLoading } = usePlaybar(
    audioRef,
    playbarRef,
  );

  return (
    <>
      {track && (
        <div
          className={cn(
            "fixed bottom-0 left-0 z-100 flex h-[70px] w-full items-center justify-center bg-[#F5F4F7]",
            className,
          )}
          ref={playbarRef}
        >
          {audioSrc && (
            <audio ref={audioRef} preload="metadata" src={audioSrc} />
          )}
          <div
            className={cn(
              "flex items-center justify-center gap-6",
              isLoading && "pointer-events-none blur-xs",
            )}
          >
            <ul className="flex items-center justify-center gap-5">
              {PLAYBAR_BUTTONS.map((item) => (
                <li key={item.name}>{item.component}</li>
              ))}
            </ul>

            <div className="ml-5 flex items-center justify-center gap-3 font-semibold">
              <span className="text-accent">
                {formatTrackTime(currentTime)}
              </span>
              <PlaybarProgressBar />
              <span className="text-gray-600">
                {formatTrackTime(trackDuration)}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <PlaybarButtonVolume />
              <ButtonLikeTrack track={track} />
            </div>

            <TrackCard.Image
              imageUrl={track.artwork["150x150"]}
              width={45}
              height={40}
              className="h-[40px] w-[45px] shadow-lg"
            />
            <div className="max-w-[120px]">
              <TrackCard.Title
                className="text-accent truncate"
                title={track.title}
              />
              <TrackCard.Artist
                className="hover:text-accent truncate transition-colors duration-200"
                href={`/users/${track.user.id}`}
                name={track.user.name}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

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
            "fixed bottom-0 left-0 z-100 flex h-[70px] w-full items-center justify-center bg-[#F5F4F7] max-[1100px]:h-[78px]",
            className,
          )}
          ref={playbarRef}
        >
          {audioSrc && (
            <audio ref={audioRef} preload="metadata" src={audioSrc} />
          )}
          <div
            className={cn(
              "flex items-center justify-center gap-6 max-xl:gap-4 max-lg:gap-2.5",
              isLoading && "pointer-events-none blur-xs",
            )}
          >
            <div className="flex gap-4 max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:gap-2.5">
              <ul className="flex items-center justify-center gap-5 max-xl:gap-4">
                {PLAYBAR_BUTTONS.map((item) => (
                  <li key={item.name}>{item.component}</li>
                ))}
              </ul>

              <div className="ml-5 flex items-center justify-center gap-3 font-semibold max-xl:mx-2 max-xl:gap-5 max-sm:gap-3">
                <span className="text-accent">
                  {formatTrackTime(currentTime)}
                </span>
                <PlaybarProgressBar />
                <span className="text-gray-600">
                  {formatTrackTime(trackDuration || 0)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 max-sm:gap-3">
              <PlaybarButtonVolume />
              <ButtonLikeTrack track={track} />
            </div>
            <div className="flex items-center gap-4 max-[1100px]:order-first max-xl:gap-2 max-sm:hidden">
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
        </div>
      )}
    </>
  );
};

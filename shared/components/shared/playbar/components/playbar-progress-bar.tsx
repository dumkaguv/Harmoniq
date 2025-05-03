"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { calculatePlaybarProgressPercentage } from "@/shared/lib";
import { usePlaybar } from "@/shared/store/playbar";
import { useShallow } from "zustand/shallow";

interface Props {
  className?: string;
}

export const PlaybarProgressBar: FC<Props> = ({ className }) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [audioRef, trackDuration, currentTime] = usePlaybar(
    useShallow((state) => [
      state.audioRef,
      state.trackDuration,
      state.currentTime,
    ]),
  );

  const updateTime = (clientX: number) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect || !audioRef?.current) return;

    const clickX = clientX - rect.left;
    const newTime = Math.min(
      Math.max((clickX / rect.width) * trackDuration, 0),
      trackDuration,
    );

    audioRef.current.currentTime = newTime;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateTime(e.clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateTime(e.clientX);
      }
    };

    const onMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={barRef}
      onMouseDown={onMouseDown}
      className={cn("flex h-7 cursor-pointer items-center", className)}
      aria-hidden
    >
      <div
        aria-label="Seek"
        className="relative h-0.5 w-[500px] rounded-4xl bg-gray-300 max-xl:w-[350px] max-lg:w-[280px] max-md:w-[200px] max-sm:w-[170px]"
      >
        <div
          className="bg-accent absolute h-0.5 rounded-4xl"
          style={{
            width: `${calculatePlaybarProgressPercentage(currentTime, trackDuration)}%`,
          }}
        />

        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white shadow-lg"
          style={{
            left: `${calculatePlaybarProgressPercentage(currentTime, trackDuration)}%`,
          }}
          title="Seek"
        />
      </div>
    </div>
  );
};

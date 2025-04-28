"use client";

import React, { FC, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Repeat } from "lucide-react";
import { usePlaybar } from "@/shared/store/playbar";
import { useShallow } from "zustand/shallow";

interface Props {
  size?: number;
  className?: string;
}

export const PlaybarButtonRepeat: FC<Props> = ({ size = 24, className }) => {
  const [audioRef, isRepeating, setIsRepeating] = usePlaybar(
    useShallow((state) => [
      state.audioRef,
      state.isRepeating,
      state.setIsRepeating,
    ]),
  );

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) {
      return;
    }

    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeating, audioRef]);

  return (
    <button
      onClick={() => setIsRepeating(!isRepeating)}
      className={cn(
        "hover:text-accent flex items-center transition-colors",
        isRepeating &&
          "after:bg-accent text-accent relative after:absolute after:-bottom-3 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full",
        className,
      )}
      title="Repeat"
      aria-label="Repeat"
      type="button"
    >
      <Repeat size={size} />
    </button>
  );
};

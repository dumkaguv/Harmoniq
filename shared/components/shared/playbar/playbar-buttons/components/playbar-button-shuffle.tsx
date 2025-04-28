"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Shuffle } from "lucide-react";
import { usePlaybar } from "@/shared/store/playbar";
import { useShallow } from "zustand/shallow";

interface Props {
  size?: number;
  className?: string;
}

export const PlaybarButtonShuffle: FC<Props> = ({ size = 24, className }) => {
  const [isShuffling, setIsShuffling] = usePlaybar(
    useShallow((state) => [state.isShuffling, state.setIsShuffling]),
  );

  return (
    <button
      onClick={() => setIsShuffling(!isShuffling)}
      className={cn(
        "hover:text-accent flex items-center transition-colors",
        isShuffling &&
          "text-accent after:bg-accent relative after:absolute after:-bottom-3 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full",
        className,
      )}
      title="Shuffle"
      aria-label="Shuffle"
      type="button"
    >
      <Shuffle size={size} />
    </button>
  );
};

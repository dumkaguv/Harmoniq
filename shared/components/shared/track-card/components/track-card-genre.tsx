import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  genre: string;
  onClick?: () => void;
  className?: string;
}

export const TrackCardGenre: FC<Props> = ({ genre, onClick, className }) => {
  return (
    <p
      onClick={onClick}
      className={cn("font-semibold text-neutral-500 max-xl:text-sm", className)}
    >
      {genre}
    </p>
  );
};

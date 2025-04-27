import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  genre: string;
  className?: string;
}

export const TrackCardGenre: FC<Props> = ({ genre, className }) => {
  return <p className={cn("text-neutral-500 font-semibold", className)}>{genre}</p>;
};

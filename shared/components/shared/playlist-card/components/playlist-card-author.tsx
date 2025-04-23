import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  author: string;
  className?: string;
}

export const PlaylistCardAuthor: FC<Props> = ({ author, className }) => {
  return (
    <p className={cn("truncate text-sm text-neutral-500", className)}>
      {author}
    </p>
  );
};

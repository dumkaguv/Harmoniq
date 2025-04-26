import React, { FC, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  author: string;
  endAdornment?: ReactNode;
  className?: string;
}

export const PlaylistCardAuthor: FC<Props> = ({
  author,
  endAdornment,
  className,
}) => {
  return (
    <p className={cn("text-sm text-neutral-500", className)}>
      {author}
      {endAdornment}
    </p>
  );
};

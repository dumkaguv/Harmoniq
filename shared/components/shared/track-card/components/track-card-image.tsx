import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  imageUrl: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export const TrackCardImage: FC<Props> = ({
  imageUrl,
  width = 190,
  height = 200,
  alt = "",
  className,
}) => {
  return (
    <img
      src={imageUrl}
      className={cn(
        `h-[${height}px] w-[${width}px] rounded-sm shadow-md`,
        className,
      )}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

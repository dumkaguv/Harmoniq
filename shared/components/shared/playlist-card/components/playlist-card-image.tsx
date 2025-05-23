import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  imageSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const PlaylistCardImage: FC<Props> = ({
  imageSrc,
  alt = "",
  width = 190,
  height = 200,
  className,
}) => {
  return (
    <img
      src={imageSrc}
      className={cn(`shrink-0 rounded-sm shadow-md`, className)}
      style={{ width: width, height: height }}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
  );
};

import { cn } from "@/shared/lib";
import React, { FC } from "react";

interface Props {
  imageWidth?: number;
  imageHeight?: number;
  titleWidth?: number;
  titleHeight?: number;
  authorWidth?: number;
  authorHeight?: number;
  isHorizontal?: boolean;
  className?: string;
  classNameImage?: string;
}

export const PlaylistCardSkeleton: FC<Props> = ({
  imageWidth = 190,
  imageHeight = 200,
  titleWidth = 140,
  titleHeight = 24,
  authorWidth = 80,
  authorHeight = 20,
  isHorizontal = false,
  className,
  classNameImage,
}) => {
  return (
    <div className={cn(isHorizontal && "flex gap-2", className)}>
      <div
        className={cn(
          "shrink-0 animate-pulse rounded-sm bg-gray-300",
          classNameImage,
        )}
        style={{ width: imageWidth, height: imageHeight }}
      />
      <div className={cn(isHorizontal && "flex-col")}>
        <div
          className="mt-2 animate-pulse rounded-sm bg-gray-300"
          style={{ width: titleWidth, height: titleHeight }}
        />
        <div
          className="mt-1 animate-pulse rounded-sm bg-gray-300"
          style={{ width: authorWidth, height: authorHeight }}
        />
      </div>
    </div>
  );
};

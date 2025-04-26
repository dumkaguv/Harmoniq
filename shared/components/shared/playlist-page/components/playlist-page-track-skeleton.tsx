import React, { FC } from "react";

export const PlaylistPageTrackSkeleton: FC = () => {
  return (
    <>
      <div className="h-6 w-5 animate-pulse rounded bg-gray-300" />
      <div className="h-6 w-[400px] animate-pulse rounded bg-gray-300" />
      <div className="h-6 w-[120px] animate-pulse rounded bg-gray-300" />
      <div className="h-6 w-[120px] animate-pulse rounded bg-gray-300" />
      <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
      <div className="h-6 w-14 animate-pulse rounded bg-gray-300" />
      <div className="h-6 w-10 animate-pulse rounded bg-gray-300" />
    </>
  );
};

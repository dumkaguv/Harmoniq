"use client";

import React, { FC, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Track } from "@/types/audius";
import { Api } from "@/shared/services/api-client";

interface Props {
  className?: string;
}

export const TopTracks: FC<Props> = ({ className }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const data = await Api.tracks.fetchTracks("trending", "time=week");
        setTracks(data);
      } catch (e) {
        console.log("front fetchTracks error", e);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTracks();
  }, []);

  const skeletons = new Array(7).fill(0).map((_, index) => (
    <tr key={index} className="border-gray-200 not-last:border-b">
      <td className="py-[7.5px] pr-4">
        <div className="h-6 w-6 animate-pulse rounded-sm bg-gray-300" />
      </td>
      <td className="pr-4">
        <div className="h-6 w-[330px] animate-pulse rounded-sm bg-gray-300" />
      </td>
      <td>
        <div className="h-6 w-[120px] animate-pulse rounded-sm bg-gray-300" />
      </td>
    </tr>
  ));

  return (
    <div className={cn("flex-1", className)}>
      <h3 className="text-2xl font-semibold text-black">
        Top Of The Week Hits
      </h3>
      <table className="mt-4 w-full">
        <thead className="border-y-[1px] border-gray-200 text-left text-sm uppercase">
          <tr className="tracking-widest text-stone-400">
            <th className="py-1">№</th>
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody className="truncate text-base text-gray-600">
          {!isLoading &&
            tracks.length > 0 &&
            tracks.slice(0, 7).map((track, index) => (
              <tr
                key={track.id}
                className="border-gray-200 font-semibold not-last:border-b-[1px]"
              >
                <td
                  className="hover:text-accent cursor-pointer py-[7.5px] pr-4 text-neutral-500 duration-200"
                  title="Play track"
                >
                  {index + 1}
                </td>
                <td
                  className="hover:text-accent max-w-[250px] cursor-pointer truncate pr-12 duration-200"
                  title="Play track"
                >
                  {track.title}
                </td>
                <td className="hover:text-accent cursor-pointer duration-200">
                  {track.user.name}
                </td>
              </tr>
            ))}
          {isLoading && skeletons}
        </tbody>
      </table>
    </div>
  );
};

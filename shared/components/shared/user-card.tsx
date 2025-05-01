"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Track, User } from "@/types/audius";
import {
  AudioLines,
  BookImage,
  ExternalLink,
  User as UserIcon,
} from "lucide-react";
import { Api } from "@/shared/services/api-client";
import { TracksTable } from "./tracks-table";

interface Props {
  user: User;
  className?: string;
}

const LIMIT = 20;

export const UserCard: FC<Props> = ({ user, className }) => {
  const infiniteScrollRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [userTracks, setUserTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    const fetchUserTracks = async () => {
      setIsLoading(true);
      try {
        const data = await Api.users.fetchPlaylistTracks(
          user.id,
          LIMIT,
          offset,
        );
        if (data.length < LIMIT || data.length === 0) {
          setCanLoadMore(false);
        }
        setUserTracks([...userTracks, ...data]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserTracks();
  }, [offset, user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {  
        if (entries[0].isIntersecting && !isLoading) {
          setOffset((prev) => prev + LIMIT);
        }
      },
      { threshold: 0.9 },
    );

    if (infiniteScrollRef.current) {
      observer.observe(infiniteScrollRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <div className={className}>
      <img
        src={user.cover_photo["640x"]}
        className="mr-5 max-h-[300px] w-full rounded-l-md object-cover"
        width={1370}
        height={300}
        alt=""
      />
      <div className="flex gap-x-5">
        <img
          src={user.profile_picture["480x480"]}
          className="border-accent relative -top-12 h-[250px] w-[250px] rounded-full border-2"
          width={250}
          height={250}
          alt={"profile picture"}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-accent text-7xl font-bold">{user.name}</h1>
          <div className="pr-5">
            <span>Bio: {user.bio}</span>
            <div className="mt-2 flex gap-1">
              <AudioLines size={24} />
              <span>Tracks count</span>:{" "}
              <span className="font-semibold">{user.track_count}</span>
            </div>
            <div className="mt-2 flex gap-1">
              <UserIcon size={24} />
              <span>Followers</span>:{" "}
              <span className="font-semibold">{user.follower_count}</span>
            </div>
            <div className="mt-2 flex gap-1">
              <BookImage size={24} />
              <span>Playlists</span>:{" "}
              <span className="font-semibold">{user.playlist_count}</span>
            </div>
            {user.website && (
              <div className="mt-2 flex gap-1">
                <ExternalLink size={24} />
                <span>Website</span>:{" "}
                <a
                  href={user.website}
                  target="_blank"
                  className="font-semibold"
                >
                  {user.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        <TracksTable
          tracks={userTracks}
          trackCount={user.track_count}
          setTracks={setUserTracks}
          isLoading={isLoading}
          canLoadMore={canLoadMore}
          className="mt-5 pr-5"
        />
        <div
          ref={infiniteScrollRef}
          className="absolute bottom-0 left-0 h-1 w-full"
        />
      </div>
    </div>
  );
};

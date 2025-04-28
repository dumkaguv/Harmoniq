import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { User } from "@/types/audius";
import {
  AudioLines,
  BookImage,
  ExternalLink,
  User as UserIcon,
} from "lucide-react";

interface Props {
  user: User;
  className?: string;
}

export const UserCard: FC<Props> = ({ user, className }) => {
  return (
    <div
      className={cn("relative mr-5 min-h-[430px] w-full rounded-md", className)}
      style={{
        backgroundImage: `url("${user.cover_photo["2000x"]}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-10 left-10 text-accent">
        <h1 className="text-accent text-7xl font-bold">{user.name}</h1>
        <div className="mt-2 flex items-center gap-5">
          <img
            src={user.profile_picture["480x480"]}
            className="rounded-sm shadow-2xl"
            width={250}
            height={250}
            alt={"profile picture"}
          />
          <div className="pr-5">
            <span>Bio: {user.bio}</span>
            <div className="mt-2 flex gap-1">
              <AudioLines size={24} />
              <span>Track count</span>:{" "}
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
    </div>
  );
};

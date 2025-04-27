import { cn } from "@/shared/lib/utils";
import { BookImage, Clock, Heart, Music } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  className?: string;
}

const LIBRARY_MENU = [
  {
    name: "Recently Played",
    icon: <Clock size={20} />,
    href: "/recent",
  },
  {
    name: "Tracks",
    icon: <Music size={20} />,
    href: "/tracks",
  },
  {
    name: "Playlists",
    icon: <BookImage size={20} />,
    href: "/playlists",
  },
  {
    name: "Liked",
    icon: <Heart size={20} />,
    href: "/liked",
  },
];

export const SidebarLibrary: FC<Props> = ({ className }) => {
  return (
    <div className={cn("mt-5 p-4", className)}>
      <h3 className="font-semibold text-neutral-600">Your Library</h3>
      <ul className="mt-4 flex flex-col gap-5 pl-3">
        {LIBRARY_MENU.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="hover:text-accent flex items-center gap-2 text-neutral-600"
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

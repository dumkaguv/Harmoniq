import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";

import { SidebarLibrary, SidebarPlaylists } from "./";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  return (
    <aside className={cn("bg-gray-custom overflow-y-auto max-h-screen", className)}>
      <div className="pt-6">
        <Link
          className="before:bg-accent relative flex items-center gap-2 pl-6 font-semibold before:absolute before:inset-0 before:h-full before:w-2 before:rounded-r-sm"
          href="/"
        >
          <Globe size={20} />
          Recommended For You
        </Link>

        <SidebarLibrary />
        <SidebarPlaylists />
      </div>
    </aside>
  );
};

"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";

import { SidebarLibrary, SidebarPlaylists } from "./";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  const activeLinkStyles =
    "before:bg-accent before:absolute before:inset-0 before:h-full before:w-2 before:rounded-r-sm";

  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-gray-custom sticky top-0 max-h-screen overflow-y-auto",
        className,
      )}
    >
      <div className="pt-6">
        <Link
          className={`relative flex items-center gap-2 pl-6 font-semibold ${pathname === "/" && activeLinkStyles}`}
          href="/"
        >
          <Globe size={20} />
          Recommended For You
        </Link>

        <SidebarLibrary activeLinkStyles={activeLinkStyles} />
        <SidebarPlaylists activeLinkStyles={activeLinkStyles} />
      </div>
    </aside>
  );
};

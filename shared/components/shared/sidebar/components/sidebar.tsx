"use client";

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { AudioLines, X } from "lucide-react";
import Link from "next/link";

import { SidebarLibrary, SidebarPlaylists } from "./";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/shared/store/sidebar";
import { useShallow } from "zustand/shallow";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  const [isOpen, handleOpening] = useSidebarStore(
    useShallow((state) => [state.isOpen, state.handleOpening]),
  );
  const pathname = usePathname();
  const activeLinkStyles =
    "before:bg-accent before:absolute before:inset-0 before:h-full before:w-2 before:rounded-r-sm text-accent";

  return (
    <>
      <aside
        className={cn(
          "bg-gray-custom sticky top-0 z-[100] max-h-[calc(100dvh-var(--playbar-height))] max-w-[300px] overflow-y-auto transition-normal duration-200 max-lg:text-sm max-md:fixed max-md:w-0",
          { "!w-[245px]": isOpen },
          className,
        )}
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            e.target.closest("a") &&
            window.innerWidth < 768
          ) {
            handleOpening();
          }
        }}
      >
        <div className="bg-gray-custom sticky top-0 z-10 pt-6 max-lg:pt-5 max-sm:pb-3 max-sm:shadow-md">
          <div className="flex justify-between pr-2">
            <Link
              className={`relative flex items-center gap-2 pl-6 font-semibold ${pathname === "/" && activeLinkStyles}`}
              href="/"
            >
              <AudioLines size={20} />
              Harmoniq
            </Link>
            <button
              onClick={handleOpening}
              className="top-2 right-2 md:hidden"
              type="button"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div>
          <SidebarLibrary activeLinkStyles={activeLinkStyles} />
          <SidebarPlaylists activeLinkStyles={activeLinkStyles} />
        </div>
      </aside>
      {isOpen && (
        <div
          onClick={handleOpening}
          className="fixed top-0 z-10 h-full w-full bg-black/50"
        />
      )}
    </>
  );
};

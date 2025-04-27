import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface Props {
  name: string;
  href: string;
  className?: string;
}

export const TrackCardArtist: FC<Props> = ({ name, href, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "hover:text-accent font-semibold text-neutral-500",
        className,
      )}
    >
      {name}
    </Link>
  );
};

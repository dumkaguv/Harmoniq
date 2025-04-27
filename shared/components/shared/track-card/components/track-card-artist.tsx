import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface Props {
  name: string;
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  className?: string;
}

export const TrackCardArtist: FC<Props> = ({
  name,
  href,
  onClick,
  className,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "hover:text-accent font-semibold text-neutral-500",
        className,
      )}
    >
      {name}
    </Link>
  );
};

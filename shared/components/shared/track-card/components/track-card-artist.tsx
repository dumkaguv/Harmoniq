import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface Props {
  name: string;
  className?: string;
}

export const TrackCardArtist: FC<Props> = ({ name, className }) => {
  return (
    <Link href="" className={cn("text-neutral-500 hover:text-accent font-semibold", className)}>
      {name}
    </Link>
  );
};

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const TopPlaylists: FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <h3 className="text-2xl font-semibold text-black">Top Playlists</h3>
      <ul>
        
      </ul>
    </div>
  );
};

import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  className?: string;
}

export const PlaylistCardTitle: FC<Props> = ({ title, className }) => {
  return (
    <h3 className={cn("text-base text-gray-600 max-xl:text-sm", className)}>
      {title}
    </h3>
  );
};

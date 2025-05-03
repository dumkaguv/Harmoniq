import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  description: string;
  className?: string;
}

export const PlaylistCardDescription: FC<Props> = ({
  description,
  className,
}) => {
  return <p className={cn("text-neutral-600 max-xl:text-sm", className)}>{description}</p>;
};

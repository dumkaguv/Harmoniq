import React, { FC, HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  title: string;
  className?: string;
}

export const TrackCardTitle: FC<Props> = ({ title, className }) => {
  return <p className={cn("font-semibold max-xl:text-sm", className)}>{title}</p>;
};

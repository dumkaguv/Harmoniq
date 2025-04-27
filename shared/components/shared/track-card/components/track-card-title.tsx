import React, { FC, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  className?: string;
}

export const TrackCardTitle: FC<Props> = ({ title, className }) => {
  return <p className={cn("text-accent font-semibold", className)}>{title}</p>;
};

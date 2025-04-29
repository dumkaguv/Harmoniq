import React, { FC } from "react";

interface Props {
  direction: string | null;
  className?: string;
}

export const SortArrow: FC<Props> = ({ direction, className }) => {
  if (!direction) return null;
  return <span className={className}>{direction === "asc" ? "↑" : "↓"}</span>;
};

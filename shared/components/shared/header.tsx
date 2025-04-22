import React, { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui";

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <Input />
    </div>
  );
};

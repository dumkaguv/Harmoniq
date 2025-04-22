import React, { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("max-w-[1920px] mx-auto", className)}>{children}</div>
  );
};

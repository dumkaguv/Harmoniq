import React, { ComponentProps, FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props extends ComponentProps<"input"> {
  className?: string;
}

export const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "h-[40px] w-[550px] rounded-sm border-[1px] border-gray-300 pr-5 pl-10 max-lg:w-[400px]",
        className,
      )}
      placeholder="Type to search..."
      {...props}
    />
  );
};

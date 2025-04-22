import React, { ComponentProps, FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";

interface Props extends ComponentProps<"input"> {
  className?: string;
}

export const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn("relative", className)}>
      <input
        className="h-[40px] w-[350px] rounded-sm border-[1px] border-gray-300 pr-5 pl-10"
        placeholder="Type to search..."
        {...props}
      />
      <Search
        size={20}
        className="pointer-events-none absolute top-[50%] left-3 z-1 translate-y-[-50%] text-gray-400"
      />
    </div>
  );
};

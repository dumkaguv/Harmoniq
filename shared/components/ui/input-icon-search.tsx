"use client";

import React, { ComponentProps, FC } from "react";
import { Search, X } from "lucide-react";
import { Input } from ".";

interface Props extends ComponentProps<"input"> {
  setSearchValue: (value: string) => void;
  className?: string;
}

export const InputIconSearch: FC<Props> = ({
  className,
  setSearchValue,
  value,
  ...props
}) => {
  return (
    <div className="relative">
      <Input className={className} value={value} {...props} />
      <Search
        size={20}
        className="pointer-events-none absolute top-[50%] left-3 z-1 translate-y-[-50%] text-gray-400"
      />
      {value && (
        <button
          className="hover:text-accent absolute top-[50%] right-3 z-1 translate-y-[-50%] text-gray-400 transition-colors duration-200"
          onClick={() => setSearchValue("")}
          title="Clear"
          aria-label="Clear"
          type="button"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

import { FC } from "react";

export const TopTrackSkeleton: FC = () => {
  return (
    <tr className="border-gray-200 not-last:border-b">
      <td className="py-[7.5px] pr-4">
        <div className="h-6 w-6 animate-pulse rounded-sm bg-gray-300" />
      </td>
      <td className="pr-4">
        <div className="h-6 w-[330px] animate-pulse rounded-sm bg-gray-300" />
      </td>
      <td>
        <div className="h-6 w-[120px] animate-pulse rounded-sm bg-gray-300" />
      </td>
    </tr>
  );
};

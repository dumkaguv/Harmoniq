import { usePlaybar } from "@/shared/store/playbar";
import { RefObject, useEffect } from "react";

export const usePlaybarHeight = (
  playbarRef: RefObject<HTMLDivElement | null>,
) => {
  const track = usePlaybar((state) => state.track);

  useEffect(() => {
    const definePlaybarHeightVariable = () => {
      if (playbarRef.current) {
        const playbarHeight = playbarRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--playbar-height",
          `${playbarHeight}px`,
        );
      }
    };

    definePlaybarHeightVariable();
  }, [playbarRef, track]);
};

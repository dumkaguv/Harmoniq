import { usePlaybar } from "@/shared/store/playbar";
import { useEffect } from "react";

export const usePlaybarLocalStorage = () => {
  const loadPlaybarFromLocalStorage = usePlaybar(
    (state) => state.loadPlaybarFromLocalStorage,
  );

  useEffect(() => {
    loadPlaybarFromLocalStorage();
  }, [loadPlaybarFromLocalStorage]);
};

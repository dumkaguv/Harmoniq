import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  handleOpening: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isOpen: false,
  handleOpening: () => {
    console.log(get().isOpen);
    if (get().isOpen) {
      set({ isOpen: false });
    } else {
      set({ isOpen: true });
    }
  },
}));

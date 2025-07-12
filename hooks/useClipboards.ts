import { create } from "zustand";

interface ClipboardsState {
  clipboards: string[];
  latestClipboard?: string;
  setClipboards: (clipboards: string[]) => void;
  addClipboard: (clipboard: string) => void;
}

const useClipboards = create<ClipboardsState>((set) => ({
  clipboards: [],
  latestClipboard: undefined,
  setClipboards: (clipboards: string[]) => set({ clipboards, latestClipboard: clipboards[0] }),
  addClipboard: (clipboard: string) => set((state) => ({
    clipboards: [clipboard, ...state.clipboards],
    latestClipboard: clipboard,
  })),
}));
export default useClipboards;
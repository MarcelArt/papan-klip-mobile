import { Clipboard } from "@/models/clipboard.model";
import { create } from "zustand";

interface ClipboardsState {
  clipboards: Clipboard[];
  latestClipboard?: Clipboard;
  setClipboards: (clipboards: Clipboard[]) => void;
  addClipboard: (clipboard: Clipboard) => void;
}

const useClipboards = create<ClipboardsState>((set) => ({
  clipboards: [],
  latestClipboard: undefined,
  setClipboards: (clipboards: Clipboard[]) => set({ clipboards, latestClipboard: clipboards[0] }),
  addClipboard: (clipboard: Clipboard) => set((state) => ({
    clipboards: [clipboard, ...state.clipboards],
    latestClipboard: clipboard,
  })),
}));
export default useClipboards;
import { create } from "zustand";

interface ImagePreviewState {
  imageUri: string;
  imageBase64?: string;
  setImageUri: (uri: string) => void;
  setImageBase64: (base64: string) => void;
}

const useImagePreview = create<ImagePreviewState>((set) => ({
  imageUri: '',
  imageBase64: undefined,
  setImageUri: (uri: string) => set({ imageUri: uri }),
  setImageBase64: (base64: string) => set({ imageBase64: base64 }),
}));
export default useImagePreview;
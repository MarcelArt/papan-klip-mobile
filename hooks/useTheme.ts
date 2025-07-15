import { create } from "zustand";

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useTheme = create<ThemeState>()((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
export default useTheme;
import { create } from 'zustand';

interface BaseUrlState {
	baseUrl: string;
	isConnected: boolean;
	setBaseUrl: (url: string) => void;
	setIsConnected: (isConnected: boolean) => void;
}

const useBaseUrl = create<BaseUrlState>()((set) => ({
	baseUrl: '',
	isConnected: false,
	setBaseUrl: (url: string) => set({ baseUrl: url }),
	setIsConnected: (isConnected: boolean) => set({ isConnected }),
}));
export default useBaseUrl;

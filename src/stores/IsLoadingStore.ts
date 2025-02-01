import { create } from 'zustand';

type IsLoadingStore = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
};

export const useIsLoadingStore = create<IsLoadingStore>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));

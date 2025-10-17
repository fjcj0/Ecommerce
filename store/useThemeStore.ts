import { create } from "zustand";
interface ThemeStore {
    theme: string;
    setTheme: (theme: string) => void;
}
export const useThemeStore = create<ThemeStore>((set) => ({
    theme: typeof window !== 'undefined' ? localStorage.getItem("preferred-theme") || "forest" : "forest",
    setTheme: (theme: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("preferred-theme", theme);
        }
        set({ theme });
    },
}));
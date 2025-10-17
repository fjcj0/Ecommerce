import { create } from "zustand";
interface ThemeStore {
    theme: string;
    setTheme: (theme: string) => void;
}
export const useThemeStore = create<ThemeStore>((set) => ({
    theme: "forest",
    setTheme: (theme: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("preferred-theme", theme);
        }
        set({ theme });
    },
}));
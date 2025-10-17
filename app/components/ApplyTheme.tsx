"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";
export const ApplyTheme = () => {
    const { theme, setTheme } = useThemeStore();
    useEffect(() => {
        const storedTheme = localStorage.getItem("preferred-theme");
        if (storedTheme) setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme || theme);
    }, [theme, setTheme]);
    return null;
};
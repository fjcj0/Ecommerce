"use client";
import React, { useEffect, useState } from "react";
import { THEMES } from "@/constants/themes";
import { useThemeStore } from "@/store/useThemeStore";
import { PaletteIcon } from "lucide-react";
const ThemeSelector = () => {
    const { theme, setTheme } = useThemeStore();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return (
        <div className=" relative z-50">
            <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle">
                    <PaletteIcon className="w-5 h-5" />
                </button>
                <div
                    tabIndex={0}
                    className="dropdown-content mt-2 p-1 overflow-y-auto max-h-[40rem] shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10"
                >
                    {THEMES.map((themeOption) => (
                        <button
                            onClick={() => setTheme(themeOption.name)}
                            key={themeOption.name}
                            className={`
              w-full px-4 py-3 rounded-xl
              flex items-center gap-3
              transition-colors duration-300
              my-3
              ${theme === themeOption.name
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-base-content/5"
                                }
            `}
                        >
                            <PaletteIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{themeOption.label}</span>
                            <div className="ml-auto flex gap-1">
                                {themeOption.colors.map((color, index) => (
                                    <span
                                        key={index}
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: color }}
                                    ></span>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ThemeSelector;
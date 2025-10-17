"use client";
import { useEffect, useState } from "react";
import useSlideStore from "@/store/slideStore";
const Slider = () => {
    const { isSlideOpen, toggleSlide } = useSlideStore();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div
            className={`fixed top-0 left-0 h-screen overflow-y-auto bg-base-300 transition-all duration-300 z-10 flex flex-col
      ${isSlideOpen ? "w-[18rem]" : "w-0"} 
      ${isSlideOpen ? "md:w-[18rem]" : "md:w-[5rem]"}`}
        >
        </div>
    );
};
export default Slider;
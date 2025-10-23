"use client";
import { ReactNode, useState, useEffect } from "react";
import Slider from "./components/Slider";
import useSlideStore from "@/store/slideStore"; import Header from "./components/Header";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ChatLayoutClient({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const { isSlideOpen } = useSlideStore();
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return (
        <main className="w-screen min-h-[100vh] flex flex-row">
            <Slider />
            <div
                className={`absolute right-0 h-full duration-300
                 ${isSlideOpen ? "md:w-[calc(100%-18rem)] w-full" : "md:w-[calc(100%-5rem)] w-full"
                    } `}>
                <Header />
                {children}
            </div>
        </main>
    );
}
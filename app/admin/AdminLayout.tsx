"use client";
import { ReactNode, useState, useEffect } from "react";
import Slider from "./components/Slider";
import useSlideStore from "@/store/slideStore";
import Header from "./components/Header";
import { useRouter } from "next/navigation";
export default function AdminLayout({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const { isSlideOpen } = useSlideStore();
    const router = useRouter();
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
            console.log('Redirecting to home page...');
            router.replace('/');
        }
    }, [router]);
    if (!mounted) return null;
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg">Redirecting...</span>
            </div>
        );
    }
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
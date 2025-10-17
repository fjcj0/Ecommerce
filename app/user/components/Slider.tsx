"use client";
import { useEffect, useState } from "react";
import useSlideStore from "@/store/slideStore";
import { userLinks } from "@/data/data";
import Link from "next/link";
import { XIcon, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Slider = () => {
    const { isSlideOpen, toggleSlide } = useSlideStore();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div
            className={`fixed top-0 font-raleway left-0 h-screen overflow-y-auto bg-base-300 z-10 flex flex-col
        ${isSlideOpen ? "w-[18rem]" : "w-0"} 
        ${isSlideOpen ? "md:w-[18rem]" : "md:w-[5rem]"}`}
        >
            <div className="p-5 flex flex-col w-full gap-9">
                <div
                    className={`flex w-full ${isSlideOpen
                        ? "items-start justify-start"
                        : "items-center justify-center"
                        }`}
                >
                    <div className="w-full flex items-center justify-between gap-1 text-xl">
                        <div className="flex items-center justify-center gap-1 text-xl">
                            <Zap size={25} />{" "}
                            <span className={`${isSlideOpen ? "block" : "hidden"}`}>
                                Dashboard
                            </span>
                        </div>
                        {isSlideOpen && <button type="button" className=" md:hidden flex btn btn-circle" onClick={toggleSlide}><XIcon /></button>}
                    </div>
                </div>
                <div
                    className={`${isSlideOpen ? "w-full items-start justify-start" : "w-auto items-center justify-center"
                        } flex flex-col gap-3`}
                >
                    {userLinks.map((link, index) => {
                        const isActive = pathname === link.to;
                        return (
                            <Link
                                key={index}
                                href={link.to}
                                className={`flex ${isSlideOpen ? "w-full" : "w-auto"
                                    } items-center justify-start px-5 py-3 rounded-md gap-1
                ${isActive
                                        ? "bg-primary text-base-300 cursor-default"
                                        : "hover:bg-primary/80 hover:text-base-300 text-base-content"
                                    }`}
                            >
                                <link.icon size={20} />
                                <p className={`${isSlideOpen ? "block" : "hidden"}`}>
                                    {link.name}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="w-full h-full flex items-end justify-center p-3">
                <div
                    className={`w-full rounded-md p-3  flex flex-col items-start justify-start gap-3
                        `}
                >
                    <Image
                        src={'/omarcoding.jpeg'}
                        width={80}
                        height={80}
                        alt="by omar coding"
                        className="rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;

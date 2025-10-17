import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cardDashboardProps } from "@/global.t";

const Card = ({ icon: Icon, title, value, decrease, increase, isMoney }: cardDashboardProps) => {
    return (
        <div className="w-full hover:bg-primary/20 font-poppins h-[10rem] bg-base-300/80 p-4 rounded-2xl shadow-md flex justify-between items-center">
            <div className="flex h-full flex-col items-start justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <div className="flex items-center justify-center p-3 bg-primary/30 hover:bg-primary hover:text-base-300 rounded-full">
                        <Icon size={20} className="" />
                    </div>

                    <h1>{title}</h1>
                </div>
                <div className="text-2xl font-bold">
                    {isMoney ? `$${value.toLocaleString()}` : value.toLocaleString()}
                </div>
            </div>

            <div className="h-full p-3">
                {increase && (
                    <span className="flex gap-1 items-center justify-center text-primary bg-primary/30 rounded-full px-2  font-medium">
                        <ArrowUpRight size={18} /> {increase}%
                    </span>
                )}
                {decrease && (
                    <span className="flex gap-1 items-center justify-center text-primary bg-primary/30 rounded-full px-2  font-medium">
                        <ArrowDownRight size={18} /> {decrease}%
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;

import { topProductProps } from '@/global.t';
import Image from 'next/image';
import React from 'react';
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
const TopProduct = ({ name, increase, decrease, image, sold }: topProductProps) => {
    return (
        <div className='flex justify-between items-center w-full'>

            <div className='flex justify-center items-center gap-3'>
                <div className='p-3 bg-primary flex items-center justify-center rounded-lg'>
                    <Image src={image} alt={name} width={40} height={40} />
                </div>
                <div className='flex flex-col items-start justify-start '>
                    <h3>{name}</h3>
                </div>
            </div>
            {increase && <div className='flex items-center justify-center'>
                <span className='bg-primary/30 text-primary px-3 py-1 rounded-md hover:bg-primary/60 hover:text-base-300 flex items-center justify-center gap-2'><ArrowUpRight size={18} /> {increase}%</span>
            </div>}
            {decrease && <div className='flex items-center justify-center'>
                <span className='bg-primary/30 text-primary  px-3 py-1 rounded-md hover:bg-primary/60 hover:text-base-300 flex items-center justify-center gap-2'><ArrowDownRight size={18} /> {decrease}%</span>
            </div>}
        </div>
    );
}
export default TopProduct;
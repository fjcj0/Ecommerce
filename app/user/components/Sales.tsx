import React from 'react';
import { DollarSign } from 'lucide-react';
import { sales } from '@/data/data';
import Image from 'next/image';
const Sales = () => {
    return (
        <div className='flex flex-col p-3 w-full bg-base-300 rounded-lg gap-4'>
            <div className='w-full flex justify-between items-center font-raleway'>
                <h1 className='font-bold text-lg'>Sales</h1>
                <div className='p-3 bg-primary/30 rounded-full'>
                    <DollarSign size={30} />
                </div>
            </div>
            <div className='flex flex-col w-full overflow-y-auto max-h-52 gap-3'>
                {sales.map((sale, index) => (
                    <div key={index} className='w-full flex justify-between items-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='w-12 h-12 relative rounded-full overflow-hidden bg-primary/30 flex items-center justify-center'>
                                <Image
                                    src={sale.image}
                                    alt={sale.title}
                                    width={37}
                                    height={37}
                                />
                            </div>
                            <div className='flex flex-col justify-center items-start'>
                                <p className='font-raleway font-medium'>{sale.title}</p>
                                <p className='font-medium text-sm text-primary/50'>{sale.date}</p>
                            </div>
                        </div>
                        <div>
                            <p className='font-bold'>{sale.price} $</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sales;

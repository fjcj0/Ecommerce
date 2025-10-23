import React from 'react';
import { DollarSign } from 'lucide-react';
import Image from 'next/image';
const Sales = ({ data }: { data: any }) => {
    if (data == undefined) {
        return null;
    }
    return (
        <div className='flex flex-col p-3 w-full bg-base-300 rounded-lg gap-4'>
            <div className='w-full flex justify-between items-center font-raleway'>
                <h1 className='font-bold text-lg'>Last Purchases
                </h1>
                <div className='p-3 bg-primary/30 rounded-full'>
                    <DollarSign size={30} />
                </div>
            </div>
            <div className='flex flex-col w-full overflow-y-auto max-h-52 gap-3'>
                {data.map((d: any, index: number) => (
                    <div key={index} className='w-full flex justify-between items-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='w-12 h-12 relative rounded-full overflow-hidden bg-primary/30 flex items-center justify-center'>
                                <Image
                                    src={d.image}
                                    alt={d.title}
                                    width={37}
                                    height={37}
                                />
                            </div>
                            <div className='flex flex-col justify-center items-start'>
                                <p className='font-raleway font-medium'>{d.title}</p>
                                <p className='font-medium text-sm opacity-50 font-poppins'>{d.soldAt}</p>
                            </div>
                        </div>
                        <div>
                            <p className='font-bold'>{d.price}$</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sales;

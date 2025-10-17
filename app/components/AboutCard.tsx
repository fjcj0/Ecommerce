import { aboutCardProps } from '@/global.t';
import React from 'react';
import { CheckCircle } from 'lucide-react';

const AboutCard = ({ title, benefits, isOdd }: aboutCardProps) => {
    return (
        <div
            className={`font-raleway md:w-[75%] w-[96%] bg-base-content/30 hover:bg-base-content/70 border border-transparent hover:border-base-content ease duration-300 transition-all flex flex-col md:flex-row ${!isOdd ? '' : 'md:flex-row-reverse'
                } items-center justify-between p-6 rounded-lg gap-6`}
        >
            <h1 className='text-base-content font-bold text-3xl '>{title}</h1>
            <div className='flex flex-col gap-4'>
                {benefits.map((benefit, index) => (
                    <div key={index} className={` relative  flex flex-row gap-2 items-start justify-start bg-base-content p-2 rounded-md shadow ${index % 2 != 0 ? 'right-3' : ''}`}>
                        <CheckCircle size={20} className='text-base-300 mt-1' />
                        <p className='text-black'>{benefit}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AboutCard;

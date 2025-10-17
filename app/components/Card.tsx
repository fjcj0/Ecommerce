import { cardProps } from '@/global.t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Card = ({ name, image, description, to, discount }: cardProps) => {
    return (
        <div className='w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[35rem] h-[40rem] flex justify-start items-start'>

            <div className='w-1/2 flex h-full items-start justify-end'>
                <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={400}
                />
            </div>
            <div className='w-1/2 flex flex-col items-start justify-start gap-3 p-4'>
                <h1 className='font-bold font-raleway text-2xl'>{name}</h1>
                <p className='text-primary font-poppins text-sm'>{description}</p>
                <p className='badge badge-primary badge-lg rounded-md text-base-300 font-poppins'>
                    -{discount}<span className=''> %</span>
                </p>
                <Link href={to} className='btn btn-primary px-10 font-raleway font-bold rounded-lg text-sm'>
                    View
                </Link>
            </div>
        </div>
    );
};
export default Card;
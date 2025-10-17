import Image from 'next/image';
import React from 'react';
const OurWork = () => {
    return (
        <div id='ourwork' className="w-full flex flex-col items-center justify-center">
            <div className="w-full grid lg:h-[40rem] lg:grid-cols-2 grid-cols-1">
                <div className="w-auto h-auto py-10 bg-base-300 flex flex-col items-start  justify-center px-8">
                    <div className="flex flex-col gap-5 justify-end items-start">
                        <p className="text-primary font-light font-poppins">
                            Our Work && Eyes To Features
                        </p>
                        <h1 className="text-base-content font-raleway font-bold text-3xl">
                            Best Practising && Deal
                        </h1>
                        <p className="text-primary font-light font-poppins lg:w-[80%]">
                            We are dedicated to delivering the best practices and solutions to our customers,
                            ensuring quality, innovation, and satisfaction in every project we undertake.
                            Our goal is to create meaningful experiences and long-lasting relationships with everyone we work with.
                        </p>
                        <button type="button" className="btn btn-outline">
                            Let's Go
                        </button>

                    </div>
                </div>
                <div
                    className="w-full h-full flex justify-center items-center">
                    <div className='relative w-full lg:right-10 lg:bottom-0 lg:block bottom-6  flex items-center justify-center'>
                        <Image src={'/ad.jpg'} width={500} height={500} alt='background' />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OurWork;
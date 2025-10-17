import Image from 'next/image';
import React from 'react';
const Home = () => {
    return (
        <div className='my-20 w-full px-5 sm:px-32 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center relative'>
            <div className='flex flex-col items-start justify-center gap-5'>
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent 
                               bg-gradient-to-r from-base-content via-base-primary to-base-content/50">
                    Ecommerce Shoes
                </h1>
                <p className='max-w-3xl text-primary font-normal text-xs md:text-sm leading-relaxed'>
                    Discover the latest trends in footwear with our online shoe store, where style meets comfort.
                    From casual sneakers and athletic shoes to elegant heels and durable boots, we offer a wide range
                    of options to suit every occasion and personality. Our user-friendly platform makes shopping effortless.
                </p>
                <button type='button' className='btn btn-primary text-white/80 mt-3 rounded-lg'>
                    Get Started
                </button>
            </div>
            <div className='relative w-full flex items-center justify-center'>
                <Image
                    src={'/background-shoes.png'}
                    alt='background'
                    width={600}
                    height={600}
                    className=' -rotate-45'
                />
            </div>
        </div>
    );
}
export default Home;
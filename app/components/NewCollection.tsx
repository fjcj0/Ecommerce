import { shoes } from '@/data/data';
import React from 'react';
import Card from './Card';
import Marquee from 'react-fast-marquee';

const NewCollection = () => {
    return (
        <div className=' flex flex-col items-center justify-center w-full'>
            <h1 className='text-5xl font-raleway font-light text-primary'>
                New <span className='text-base-content/60'>Collections</span>
            </h1>
            <div className='flex items-center justify-center w-full mt-8'>
                <Marquee speed={50}
                    gradient={true}
                    gradientColor="rgba(17, 24, 39, 0)"
                    gradientWidth={100}
                >
                    {shoes.map((shoe, index) => (
                        <div key={index} className='inline-block mr-6'>
                            <Card
                                name={shoe.name}
                                discount={shoe.discount}
                                description={shoe.description}
                                image={shoe.image}
                                to='/'
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default NewCollection;

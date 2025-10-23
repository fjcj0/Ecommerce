"use client";
import { shoes } from '@/data/data';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { baseUrl } from '@/global.t';
const NewCollection = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const handleProduct = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/api/last-five-products`);
            setProducts(response.data.products);
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        handleProduct();
    }, []);
    console.log(products);
    if (isLoading) {
        return (
            <div className='w-full flex items-center justify-center'>
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    };
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
                    {products.map((product: any, index: number) => (
                        <div key={index} className='inline-block mr-6'>
                            <Card
                                name={product?.title}
                                discount={product?.discount}
                                description={product?.description}
                                image={product?.image_url}
                                to={`/user/product/${product?.id}`}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default NewCollection;

"use client";
import React from 'react';
import Helpers from '../components/Helpers';
import Products from '../components/Products';
const page = () => {
    return (
        <div className='p-3 w-full h-full'>
            <div className='w-full flex flex-col h-full justify-start'>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-3'>
                    <div className='md:col-span-2'>
                        <div className='flex flex-col'>
                            <Helpers />
                        </div>
                    </div>
                    <div className='md:col-span-4'>
                        <div className='w-full flex flex-col'>
                            <Products />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default page;
import React from 'react';
import CheckOutCard from '@/app/user/components/CheckOutCard';
import { checkouts } from '@/data/data';
const page = () => {
    return (
        <div className='p-3'>
            <div className='flex flex-col'>

                <div className='flex flex-col gap-3'>
                    {
                        checkouts.map((checkout, index) => (
                            <CheckOutCard key={index} title={checkout.title} image={checkout.image} quantity={checkout.quantity} sizes={checkout.sizes} />
                        ))
                    }
                </div>

                <div className='flex items-start justify-start my-5'>
                    <button type='button' className='btn btn-primary font-raleway px-5'>Check Out</button>
                </div>
            </div>
        </div>
    );
}
export default page;
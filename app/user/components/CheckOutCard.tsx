import { checkoutsProps } from '@/global.t';
import Image from 'next/image';
import React from 'react';
const CheckOutCard = ({ title, image, quantity, sizes }: checkoutsProps) => {
    const sizesDefault = ['XS', 'S', 'MD', 'L', 'XL'];
    return (
        <div className='flex justify-between items-center bg-base-300 p-3 rounded-xl'>
            <div>
                <Image src={image} alt={title} width={250} height={250} />
            </div>
            <div className='flex flex-col items-start justify-start gap-3'>
                <h1 className='font-bold text-2xl font-raleway'>{title}</h1>
                <div className='flex items-center justify-center gap-3'>
                    <button type='button' className='btn btn-circle'>-</button>
                    <p>{quantity}</p>
                    <button type='button' className='btn btn-circle'>+</button>
                </div>
                <div className='grid grid-cols-4 md:grid-cols-3 gap-3 mr-auto'>
                    {sizesDefault.map((sizeD, index) => {
                        const isSelected = sizes?.some(s => s.size === sizeD && s.selected) ?? false;
                        return (
                            <button
                                key={index}
                                type='button'
                                className={`btn btn-circle ${isSelected ? 'btn-primary' : ''}`}
                            >
                                {sizeD}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default CheckOutCard;
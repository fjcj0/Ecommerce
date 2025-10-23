import Image from 'next/image';
import React from 'react';
export interface Sizes {
    xs?: boolean;
    s?: boolean;
    m?: boolean;
    l?: boolean;
    xl?: boolean;
}
export interface Shoe {
    id: number;
    title: string;
    price: string;
    description: string;
    available: boolean;
    sizes: Sizes;
    discount: string;
    ends_in: string;
    quantity: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
    image_url: string;
}
export interface CheckoutItem {
    id: number;
    user_id: number;
    shoe_id: number;
    quantity: number;
    sizes: Sizes;
    created_at: string;
    updated_at: string;
    shoes: Shoe;
}
export interface CheckoutCardProps {
    id: number;
    title: string;
    image: string;
    quantity: number;
    price: string;
    discount?: string;
    sizes: Sizes;
    onQuantityChange: (checkoutId: number, newQuantity: number) => void;
    onSizeChange: (checkoutId: number, size: string, selected: boolean) => void;
    onRemove: (checkoutId: number) => void;
    description?: string;
    available?: boolean;
    ends_in?: string;
    is_visible?: boolean;
    created_at?: string;
    updated_at?: string;
}
export interface checkoutsProps {
    id?: number;
    title?: string;
    image?: string;
    quantity: number;
    sizes?: Sizes;
    price?: string;
    discount?: string;
    shoes?: Shoe;
}
const CheckOutCard = ({
    id,
    title,
    image,
    quantity,
    sizes,
    price,
    discount,
    onQuantityChange,
    onSizeChange,
    onRemove
}: CheckoutCardProps) => {
    const sizesOptions = [
        { key: 'xs', label: 'XS' },
        { key: 's', label: 'S' },
        { key: 'm', label: 'M' },
        { key: 'l', label: 'L' },
        { key: 'xl', label: 'XL' }
    ];
    const basePrice = price ? parseFloat(price) : 0;
    const discountPercent = discount ? parseFloat(discount) : 0;
    const discountedPrice = basePrice * (1 - discountPercent / 100);
    const selectedSizesCount = sizes ? Object.values(sizes).filter(Boolean).length : 0;
    const totalPrice = discountedPrice * quantity * selectedSizesCount;
    return (
        <div className='flex flex-col md:flex-row justify-between items-start bg-base-300 p-4 rounded-xl gap-4 mb-4'>
            <div className='flex-shrink-0'>
                <Image
                    src={image || '/placeholder-image.jpg'}
                    alt={title || 'Product'}
                    width={120}
                    height={120}
                    className='rounded-lg object-cover'
                />
            </div>
            <div className='flex-1 flex flex-col gap-3 w-full'>
                <div className='flex justify-between items-start'>
                    <h1 className='font-bold text-xl font-raleway'>{title}</h1>
                    <button
                        onClick={() => onRemove(id!)}
                        className='btn btn-ghost btn-sm text-error'
                    >
                        ✕
                    </button>
                </div>
                <div className='flex items-center gap-2'>
                    {discountPercent > 0 ? (
                        <>
                            <span className='text-lg font-bold text-green-600'>
                                ${discountedPrice.toFixed(2)}
                            </span>
                            <span className='text-sm line-through text-gray-500'>
                                ${basePrice.toFixed(2)}
                            </span>
                            <span className='text-sm bg-red-500 text-white px-2 py-1 rounded'>
                                -{discountPercent}%
                            </span>
                        </>
                    ) : (
                        <span className='text-lg font-bold'>
                            ${basePrice.toFixed(2)}
                        </span>
                    )}
                </div>
                <div className='flex items-center gap-3'>
                    <span className='font-semibold'>Quantity:</span>
                    <div className='flex items-center gap-2'>
                        <button
                            type='button'
                            className='btn btn-circle btn-sm btn-outline'
                            onClick={() => onQuantityChange(id!, Math.max(1, quantity - 1))}
                        >
                            -
                        </button>
                        <span className='w-8 text-center font-bold text-lg'>{quantity}</span>
                        <button
                            type='button'
                            className='btn btn-circle btn-sm btn-outline'
                            onClick={() => onQuantityChange(id!, quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='font-semibold'>Sizes:</span>
                    <div className='flex flex-wrap gap-2'>
                        {sizesOptions.map((sizeOption) => {
                            const isSelected = sizes?.[sizeOption.key as keyof typeof sizes] || false;
                            return (
                                <button
                                    key={sizeOption.key}
                                    type='button'
                                    className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => onSizeChange(id!, sizeOption.key, !isSelected)}
                                >
                                    {sizeOption.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className='flex justify-start items-start'>
                    <span className='font-poppins text-primary p-3 bg-primary/30 px-4 rounded-3xl'>
                        Final Price: ${totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default CheckOutCard;